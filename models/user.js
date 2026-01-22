// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          requiredIfNormal(value) {
            if (this.type === 'normal' && !value) {
              throw new Error('Password is required for normal login');
            }
          }
        }
      },

      mobile: {
        type: DataTypes.STRING,
        allowNull: true
      },

      type: {
        type: DataTypes.ENUM('normal', 'google', 'facebook', 'apple'),
        allowNull: false,
        defaultValue: 'normal'
      },

      gender: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          requiredIfNormal(value) {
            if (this.type === 'normal' && !value) {
              throw new Error('Gender is required for normal login');
            }
          }
        }
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
