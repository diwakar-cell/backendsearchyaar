/**
 * Verify Account Email Template
 */
exports.verifyAccountEmail = ({ fullName, email, otp, verifyLink }) => {
  return `
  <!doctype html>
  <html>
    <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px;">
        
        <h2 style="color:#333;">Welcome to Searchyaar 🎉</h2>
        
        <p>Hi <b>${fullName || 'User'}</b>,</p>
        <p>Your account has been created successfully.</p>

        <p style="margin-top:20px;">
          <b>Your OTP:</b>
          <span style="font-size:20px; font-weight:bold;">${otp}</span>
        </p>

        <p>Click the button below to verify your account:</p>

        <a href="${verifyLink}"
          style="
            display:inline-block;
            padding:12px 25px;
            background:#4CAF50;
            color:#fff;
            text-decoration:none;
            border-radius:5px;
            margin-top:10px;
          ">
          Verify Account
        </a>

        <p style="margin-top:20px; color:#555;">
          OTP is valid for <b>10 minutes</b>. Do not share it with anyone.
        </p>

        <hr style="margin:30px 0;" />

        <p>
          Thanks & regards,<br/>
          <b>Searchyaar Team</b>
        </p>

      </div>
    </body>
  </html>
  `;
};
