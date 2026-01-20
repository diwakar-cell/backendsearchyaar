// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: true
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: true
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: true
      },

      //  OTP for email verification
      otp: {
        type: DataTypes.STRING(6),
        allowNull: true
      },

      //  OTP expiry timestamp (milliseconds)
      otp_expires: {
        type: DataTypes.BIGINT,
        allowNull: true
      },

      //  Email verification status
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'users',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  User.associate = (models) => {
  User.hasMany(models.ServiceListing, {
    foreignKey: 'user_id',
    as: 'serviceListings'
  });
};
  return User;
};
