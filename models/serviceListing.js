module.exports = (sequelize, DataTypes) => {
  const ServiceListing = sequelize.define(
    'ServiceListing',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

       user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      service_title: {
        type: DataTypes.STRING,
        allowNull: false
      },

      service_category: {
        type: DataTypes.STRING,
        allowNull: false
      },

      service_type: {
        type: DataTypes.STRING,
        allowNull: false
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },

      business_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      contact_number: {
        type: DataTypes.STRING,
        allowNull: false
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },

      full_address: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      price_type: {
        type: DataTypes.ENUM('Fixed', 'Hourly', 'Package'),
        allowNull: false,
        defaultValue: 'Fixed'
      },

      price_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },

      opening_time: {
        type: DataTypes.TIME,
        allowNull: true
      },

      closing_time: {
        type: DataTypes.TIME,
        allowNull: true
      }
    },
    {
      tableName: 'service_listings',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  ServiceListing.associate = (models) => {
    // Example relations (optional)
       ServiceListing.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',       // ✅ alias for the user who owns this listing
    onDelete: 'CASCADE'
  });

    ServiceListing.belongsTo(models.City, {
      foreignKey: 'city_id'
    });

    ServiceListing.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
    ServiceListing.hasMany(models.ListingMedia, {
  foreignKey: 'listing_id',
  as: 'ListingMedia'
});
  };

  return ServiceListing;
};
