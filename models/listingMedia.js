module.exports = (sequelize, DataTypes) => {
  const ListingMedia = sequelize.define(
    'ListingMedia',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      listing_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      urls: {
        type: DataTypes.STRING, // image/video URL
        allowNull: false
      },

      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'listing_media',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  ListingMedia.associate = (models) => {
    ListingMedia.belongsTo(models.ServiceListing, {
      foreignKey: 'listing_id',
      onDelete: 'CASCADE'
    });
  };

  return ListingMedia;
};
