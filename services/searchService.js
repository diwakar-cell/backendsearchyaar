// const { User } = require('../models');
// const {User} = require('../models');
const { User,Service,Category } = require('../models');

// const Utill = require('../utils');
const apiResponse = require('../utills/response');
const Utill = require('../utills/helper');
const Mailer = require('../utills/mailer');
const moment = require('moment');
const ApiError = require('../utills/ApiError');

const { Op } = require('sequelize');
const {
  Product,
  Deal,
  Event,
  State,
  City
} = require('../models');


// exports.getCategory = async (req,res) => {
//  try {
//     const { page = 1, pageSize = 10, name, type } = req.query;

//     const limit = parseInt(pageSize);
//     const offset = (parseInt(page) - 1) * limit;

//     const where = {};

//     if (name) {
//       where.name = { [Op.iLike]: `%${name}%` }; // PostgreSQL
//       // For MySQL use: where.name = { [Op.like]: `%${name}%` };
//     }

//     if (type) {
//       where.type = type;
//     }

//     // Fetch categories with count for pagination
//     const { count, rows } = await Category.findAndCountAll({
//       where,
//       limit,
//       offset,
//       order: [['created_At', 'DESC']], // latest first
//     });

//     const totalPages = Math.ceil(count / limit);

//     res.json({
//       data: rows,
//       pagination: {
//         total: count,
//         page: parseInt(page),
//         pageSize: limit,
//         totalPages,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     res.status(500).json({ message: 'Internal server error', error });
//   }
// };



exports.getCategory = async (req) => {
  try {
    const { page = 1, pageSize = 10, name, type } = req.query;

    const limit = parseInt(pageSize);
    const offset = (parseInt(page) - 1) * limit;

    // Detect model based on route path
    const routePath = req.route.path;

    let Model;
    switch (routePath) {
      case '/category':
        Model = Category;
        break;
      case '/products':
        Model = Product;
        break;
      case '/deals':
        Model = Deal;
        break;
      case '/events':
        Model = Event;
        break;
      case '/service':
        Model = Service;
        break;
      case '/state':
        Model = State;
        break;
      case '/city':
        Model = City;
        break;
      default:
        throw new Error('Invalid route');
    }

    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` }; // PostgreSQL
      // MySQL: { [Op.like]: `%${name}%` }
    }

    if (type) {
      where.type = type;
    }

    const { count, rows } = await Model.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_At', 'DESC']],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        pageSize: limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  } catch (error) {
    throw error;
  }
};
