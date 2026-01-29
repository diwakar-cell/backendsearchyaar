/* eslint-disable max-lines */
/* eslint-disable max-len */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
// const models = require('../models');
// const User = models.User;
const apiResponse = require('../utills/response');
const Utill = require('../utills/helper');
const Mailer = require('../utills/mailer');

// const searchService = require('../services/searchService');
// const ServiceListing = require('../models/serviceListing');
// const ListingMedia = require('../models/listingMedia');
const { ServiceListing,Media, ListingMedia,User, sequelize,searchService } = require('../models');


exports.getCategory = async (req, res,next) => {
    try {
    // const { fullName, email, mobile, gender, password } = req.body;
    const result = await searchService.getCategory(req,res);

    return apiResponse.SuccessResponseData(res, result);
    } catch (error) {
       next(error); 
      }
};


exports.getAllProductListings = async (req, res) => {
  try {
    const type = 'products';

    const whereClause = {
      type
    };

    const { rows, count } = await ServiceListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'email']
        }
      ],
      order: [['created_At', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Product listings fetched successfully',
      totalRecords: count,
      data: rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product listings',
      error: error.message
    });
  }
};
exports.getAllEventsListings = async (req, res) => {
  try {
    const type = 'events';

    const whereClause = {
      type
    };

    const { rows, count } = await ServiceListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'email']
        }
      ],
      order: [['created_At', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Product listings fetched successfully',
      totalRecords: count,
      data: rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product listings',
      error: error.message
    });
  }
};
exports.getAllServicesListings = async (req, res) => {
  try {
    const type = 'services';

    const whereClause = {
      type
    };

    const { rows, count } = await ServiceListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'email']
        }
      ],
      order: [['created_At', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Product listings fetched successfully',
      totalRecords: count,
      data: rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product listings',
      error: error.message
    });
  }
};
exports.getAllDealsListings = async (req, res) => {
  try {
    const type = 'deals';

    const whereClause = {
      type
    };

    const { rows, count } = await ServiceListing.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ListingMedia,
          as: 'ListingMedia'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullName', 'email']
        }
      ],
      order: [['created_At', 'DESC']]
    });

    return res.status(200).json({
      success: true,
      message: 'Product listings fetched successfully',
      totalRecords: count,
      data: rows
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product listings',
      error: error.message
    });
  }
};
