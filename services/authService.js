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
  const { fullName, email, mobile, gender, password } = data;
  // Check if user already exists
  const existing = await User.findOne({ where: { email } });
  if (existing) throw new ApiError(404, 'Email already exist');

  //  Hash password
  const passwordHash = await Utill.hashPassword(password);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  // Create user
  let user = await User.create({
    fullName,
    email,
    mobile,
    gender,
    password: passwordHash,
    otp,
    otp_expires: otpExpires,
    is_verified: false
  });

  // Verification link
  const verifyLink = `https://www.figma.com/design/YRgoSLPhzxBB3bMGfWXP3Y/Searchyaar?node-id=258-574&p=f`;
  // const verifyLink = `${process.env.FRONTEND_URL}/verify-account?email=${encodeURIComponent(email)}`;

  // // Email HTML
  // const html = `
  // <!doctype html>
  // <html>
  //   <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
  //     <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
  //       <h2>Welcome to Searchyaar 🎉</h2>
  //       <p>Hi <b>${fullName}</b>,</p>
  //       <p>Your account has been created successfully.</p>

  //       <p><b>Your OTP:</b> <span style="font-size:20px;">${otp}</span></p>

  //       <p>Click the button below to verify your account:</p>

  //       <a href="${verifyLink}"
  //         style="display:inline-block; padding:12px 25px; background:#4CAF50; color:#fff; text-decoration:none; border-radius:5px;">
  //         Verify Account
  //       </a>

  //       <p style="margin-top:20px;">
  //         OTP is valid for <b>10 minutes</b>. Do not share it with anyone.
  //       </p>

  //       <br/>
  //       <p>Thanks & regards,<br/><b>Searchyaar Team</b></p>
  //     </div>
  //   </body>
  // </html>
  // `;

  const html = verifyAccountEmail({fullName,email,otp,verifyLink})

  await Mailer.sendMail(
    process.env.MAIL_USERNAME, // from
    email,
    'Verify your Searchyaar account',
    html
  );



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
