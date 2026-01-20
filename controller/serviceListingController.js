const { ServiceListing, ListingMedia,User, sequelize } = require('../models');

exports.createServiceListing = async (req, res) => {
    const user_id = req?.userData.id;
  const t = await sequelize.transaction();

  try {
    const {
      media,
      ...listingData
    } = req.body;

    // 1️⃣ Create Service Listing
    const listing = await ServiceListing.create({ ...listingData, user_id }, { transaction: t });

    // 2️⃣ Create Listing Media (if provided)
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
      service_category,
      city,
      state
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = {};
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
