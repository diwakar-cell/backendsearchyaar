/* eslint-disable max-lines */
/* eslint-disable max-len */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const models = require('../models');
const User = models.User;
const apiResponse = require('../utills/response');
const Utill = require('../utills/helper');
const Mailer = require('../utills/mailer');

const searchService = require('../services/searchService');
// const authService = require('../services/authService');


exports.getCategory = async (req, res,next) => {
    try {
    // const { fullName, email, mobile, gender, password } = req.body;
    const result = await searchService.getCategory(req,res);

    return apiResponse.SuccessResponseData(res, result);
    } catch (error) {
       next(error); 
      }
};

