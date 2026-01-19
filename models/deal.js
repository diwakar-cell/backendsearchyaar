// models/deal.js
module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define(
    'Deal',
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
        // example: 'discount', 'bundle', 'offer'
      }
    },
    {
      tableName: 'deals',
      freezeTableName: true,

      // ✅ auto timestamps
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  return Deal;
};
