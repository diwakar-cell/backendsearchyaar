// const { User } = require('../models');
// const {User} = require('../models');
const { User } = require('../models');

// const Utill = require('../utils');
const apiResponse = require('../utills/response');
const Utill = require('../utills/helper');
const Mailer = require('../utills/mailer');
const moment = require('moment');
const ApiError = require('../utills/ApiError');
const userFcmService = require('./userFcmService');
const { verifyAccountEmail } = require('../utills/emailTemplate.js/verifyAccountEmail');




exports.signup = async (data) => {
  const { fullName, email, mobile, gender, password,type = 'normal' } = data;
  if (!email) throw new ApiError(400, 'Email is required');
  if (!fullName) throw new ApiError(400, 'Full name is required');

  if (type === 'normal') {
    if (!password) throw new ApiError(400, 'Password is required for normal signup');
    if (!gender) throw new ApiError(400, 'Gender is required for normal signup');
  }
  // Check if user already exists
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new ApiError(404, 'Email already exist');

  //  Hash password
  let passwordHash =null;
  if (password){
 passwordHash = await Utill.hashPassword(password);
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  // Create user
  let user = await User.create({
    fullName,
    email,
    mobile :mobile || null,
    gender :gender || null,
    password: passwordHash,
    type,
    otp,
    otp_expires: otpExpires,
    is_verified: type!=='normal'?true:false
  });

  // Verification link
  if (type === 'normal') {
  const verifyLink = `https://www.figma.com/design/YRgoSLPhzxBB3bMGfWXP3Y/Searchyaar?node-id=258-574&p=f`;
 

  const html = verifyAccountEmail({fullName,email,otp,verifyLink})
  
  await Mailer.sendMail(
    process.env.MAIL_USERNAME, // from
    email,
    'Verify your Searchyaar account',
    html
  );

  }

  //Generate token
  const token = await Utill.generateToken({ id: user.id });

  // Prepare response object
  user = user.toJSON();
  user.token = token;

  // if (fcm_token) {
  //   await userFcmService.saveToken(user.id, fcm_token);
  // }

  return user;
};


exports.login = async (email, password, fcm_token) => {
  // Find user
  let user = await User.findOne({ where: { email } });
  console.log('users', user);

  if (!user) throw new ApiError(404, 'Email is incorrect');

  //Compare password
  const isMatch = await Utill.compareHashPassword(password, user.password);
  if (!user) throw new ApiError(404, 'Password is incorrect');

  //Convert to plain object
  user = user.toJSON();

  //Generate JWT
  const token = await Utill.generateToken({ id: user.id });
  user.token = token;

  if (fcm_token) {
    await userFcmService.saveToken(user.id, fcm_token);
  }

  return user;
};



exports.sendOtp = async (email) => {
  try {
    if (!email) throw new ApiError(400, 'Email is required');

    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(404, 'User not found ');

    // Generate 4-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    await user.update({ otp, otp_expires: otpExpires });

    // Verification link
    const verifyLink = `https://www.figma.com/design/YRgoSLPhzxBB3bMGfWXP3Y/Searchyaar?node-id=258-574&p=f`;
    // const verifyLink = `${process.env.FRONTEND_URL}/verify-account?email=${encodeURIComponent(email)}`;

   const html = verifyAccountEmail({fullName:user?.fullName,email,otp,verifyLink})

    await Mailer.sendMail(
      process.env.MAIL_USERNAME, // from
      email,
      'Verify your Searchyaar account',
      html
    );


    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    console.error(error);
    throw error;
  }
};



exports.verifyOtp = async (email, otp) => {
  try {
    if (!email || !otp) {
      throw new ApiError(400, 'Email and OTP are required');
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // If already verified
    if (user.is_verified) {
      return { success: true, message: 'Account already verified' };
    }

    // Validate OTP
    if (user.otp !== otp) {
      throw new ApiError(400, 'Invalid OTP');
    }

    // Check OTP expiry
    if (!user.otp_expires || Number(user.otp_expires) < Date.now()) {
      throw new ApiError(400, 'OTP expired');
    }

    // Update verification status
    await user.update({
      is_verified: true,
      otp: null,
      otp_expires: null
    });

    return {
      success: true,
      message: 'OTP verified successfully'
    };
  } catch (error) {
    console.error('verifyOtp service error:', error);
    throw error;
  }
};



exports.resetPassword = async (email, password) => {
  try {
    if (!email || !password) throw new ApiError(40, 'User not found ');

    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(404, 'User not found ');

    const passwordHash = await Utill.hashPassword(password);
    await user.update({ password: passwordHash, otp: null, otp_expires: null, updatedAt: moment().valueOf() });

    return { success: true, message: 'Password updated successfully' };
  } catch (error) {
    console.error('resetPassword service error:', error);
    throw error;
  }
};


exports.updateUserById = async (data) => {
  const { userId, fullName, mobile, gender, password, type } = data;

  //  Find the user
  const user = await User.findByPk(userId);
  if (!user) throw new ApiError(404, 'User not found');

  //  Determine type for validation
  const userType = type || user.type; // keep existing type if not provided

  //  Validate required fields for normal users
  if (userType === 'normal') {
    if (!password && !user.password) {
      throw new ApiError(400, 'Password is required for normal user');
    }
    if (!gender && !user.gender) {
      throw new ApiError(400, 'Gender is required for normal user');
    }
  }

  //  Hash password if provided
  let passwordHash = user.password;
  if (password) {
    passwordHash = await Utill.hashPassword(password);
  }

  //  Update user
  await user.update({
    fullName: fullName || user.fullName,
    mobile: mobile || user.mobile,
    gender: gender || user.gender,
    password: passwordHash,
    type: userType
  });

  //  Prepare response
  const updatedUser = user.toJSON();
  delete updatedUser.password; // don't return password

  return updatedUser;
};

