const { ServiceListing,Media, ListingMedia,User, sequelize } = require('../models');
const path = require("path");
const fs = require("fs");


const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove non-word chars
    .replace(/\-\-+/g, '-');    // Replace multiple - with single -
};

// exports.createServiceListing = async (req, res) => {
//     const user_id = req?.userData.id;
//   const t = await sequelize.transaction();

//   try {
//     const {
//       media,
//       ...listingData
//     } = req.body;

//     // 1️⃣ Create Service Listing
//     const listing = await ServiceListing.create({ ...listingData, user_id }, { transaction: t });

//     // 2️⃣ Create Listing Media (if provided)
//     if (media && Array.isArray(media) && media.length > 0) {
//       const mediaPayload = media.map(item => ({
//         listing_id: listing.id,
//         urls: item.urls,
//         description: item.description || null
//       }));

//       await ListingMedia.bulkCreate(mediaPayload, { transaction: t });
//     }

//     await t.commit();

//     return res.status(201).json({
//       success: true,
//       message: 'Service listing created successfully',
//       data: listing
//     });

//   } catch (error) {
//     await t.rollback();

//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create service listing',
//       error: error.message
//     });
//   }
// };


exports.createServiceListing = async (req, res) => {
  const user_id = req?.userData?.id;
  const t = await sequelize.transaction();

  try {
    const { media, service_title, ...listingData } = req.body;

    if (!service_title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required to generate slug'
      });
    }

    //  Generate unique slug
    let baseSlug = slugify(service_title);
    let slug = baseSlug;
    // let count = 1;

    const slugExists = await ServiceListing.findOne({
  where: { slug: baseSlug }
});

if (slugExists) {
  return res.status(409).json({
    success: false,
    message: 'Service title already exists. Please use a different title.'
  });
}

    //  Create Service Listing
    const listing = await ServiceListing.create(
      {
        ...listingData,
        service_title,
        slug,
        user_id
      },
      { transaction: t }
    );

    // Create Listing Media
    if (media && Array.isArray(media) && media.length > 0) {
      const mediaPayload = media.map(item => ({
        listing_id: listing.id,
        urls: item.urls,
        description: item.description || null
      }));

      await ListingMedia.bulkCreate(mediaPayload, { transaction: t });
    }

    await t.commit();

    return res.status(201).json({
      success: true,
      message: 'Service listing created successfully',
      data: listing
    });

  } catch (error) {
    await t.rollback();

    return res.status(500).json({
      success: false,
      message: 'Failed to create service listing',
      error: error.message
    });
  }
};


exports.updateServiceListing = async (req, res) => {
    const user_id = req?.userData.id;
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const { media, ...listingData } = req.body;

    const listing = await ServiceListing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Service listing not found'
      });
    }

    if (listing.user_id !== user_id) {
  return res.status(403).json({
    success: false,
    message: 'You are not authorized to update this listing'
  });
}

    // 1️⃣ Update Service Listing
    await listing.update(listingData, { transaction: t });

    // 2️⃣ Replace Media (if provided)
    if (media && Array.isArray(media)) {
      // Delete old media
      await ListingMedia.destroy({
        where: { listing_id: id },
        transaction: t
      });

      // Insert new media
      if (media.length > 0) {
        const mediaPayload = media.map(item => ({
          listing_id: id,
          urls: item.urls,
          description: item.description || null
        }));

        await ListingMedia.bulkCreate(mediaPayload, { transaction: t });
      }
    }

    await t.commit();

    return res.status(200).json({
      success: true,
      message: 'Service listing updated successfully'
    });

  } catch (error) {
    await t.rollback();

    return res.status(500).json({
      success: false,
      message: 'Failed to update service listing',
      error: error.message
    });
  }
};

exports.deleteServiceListing = async (req, res) => {
    const user_id = req?.userData.id;
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const listing = await ServiceListing.findByPk(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Service listing not found'
      });
    }
    if (listing.user_id !== user_id) {
        return res.status(403).json({
            success: false,
            message: 'You are not authorized to delete this listing'
        });
    }

    // Delete listing (ListingMedia will be deleted automatically via CASCADE)
    await listing.destroy({ transaction: t });

    await t.commit();

    return res.status(200).json({
      success: true,
      message: 'Service listing deleted successfully'
    });

  } catch (error) {
    await t.rollback();

    return res.status(500).json({
      success: false,
      message: 'Failed to delete service listing',
      error: error.message
    });
  }
};


exports.getAllServiceListings = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      sub_type,
      city,
      state
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {};
    if (type) whereClause.type = type;
    if (sub_type) whereClause.sub_type = sub_type;
    if (city) whereClause.city = city;
    if (state) whereClause.state = state;

    const { count, rows } = await ServiceListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
         { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_At', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Service listings fetched successfully',
      totalRecords: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      data: rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch service listings',
      error: error.message
    });
  }
};

exports.getServiceListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await ServiceListing.findByPk(id, {
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
         { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] }
      ]
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Service listing not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Service listing fetched successfully',
      data: listing
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch service listing',
      error: error.message
    });
  }
};


exports.uploadMedia = async (req, res) => {
    try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "File is required" });
    }

    const media = await Media.create({
      original_name: req.file.originalname,
      file_name: req.file.filename,
      file_type: req.file.mimetype.split("/")[0],
      mime_type: req.file.mimetype,
      file_size: req.file.size,
      storage_path: req.file.path,
      url: `/uploads/media/${req.file.filename}`,
      uploaded_by: req.user?.id || null
    });

    res.status(201).json({
      success: true,
      message: "Media uploaded successfully",
      data: {id:media?.id,url:media?.url}
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
}


exports.deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;

    // Find media
    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    // Optional: ownership check
    if (media.uploaded_by && media.uploaded_by.toString() !== req.user?.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delete file from storage
    const filePath = path.resolve(media.storage_path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete DB record
    await media.destroy()

    res.status(200).json({
      success: true,
      message: "Media deleted successfully",
    });

  } catch (error) {
    console.error("Delete media error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete media",
    });
  }
};

exports.getServiceListingByUserId = async (req, res) => {
  try {
    const userId =  req?.userData.id; // 👈 from JWT token

    const {
      page = 1,
      limit = 10,
      type,
      sub_type,
      city,
      state
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = { user_id:userId };

    if (service_category) whereClause.service_category = service_category;
    if (city) whereClause.city = city;
    if (state) whereClause.state = state;

    const { count, rows } = await ServiceListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
         { model: User, as: 'user', attributes: ['id', 'fullName', 'email'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_At', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Service listings fetched successfully',
      totalRecords: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
      data: rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch service listings',
      error: error.message
    });
  }
};
