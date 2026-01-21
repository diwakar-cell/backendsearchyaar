// models/media.js
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      original_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mime_type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      file_size: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      storage_path: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      uploaded_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      tableName: 'media',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  Media.associate = (models) => {
    // Optional: link media to users
    Media.belongsTo(models.User, {
      foreignKey: 'uploaded_by',
      as: 'uploader'
    });
  };

  return Media;
};
