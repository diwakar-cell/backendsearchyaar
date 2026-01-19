const nodemailer = require('nodemailer');
require('dotenv').config();


// const transporter = nodemailer.createTransport({
//   host:process.env.MAIL_HOST,
//   port:process.env.MAIL_PORT,
//   // service: 'gmail',
//   secure:false,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD
//   }
// });

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jannie27@ethereal.email',
        pass: 'kcrHytGHarqnzBZwTK'
    }
});

exports.sendMail = async(from, to, subject, html) => {

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: subject,
    html: html
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('mail has been sent:-', info.response);
    }
  });

};

