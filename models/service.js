// models/service.js
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    'Service',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      type: {
        type: DataTypes.STRING,
        allowNull: false
        // example: 'maintenance', 'consulting'
      }
    },
    {
      tableName: 'services',
      freezeTableName: true,

      // ✅ auto timestamps
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  return Service;
};
