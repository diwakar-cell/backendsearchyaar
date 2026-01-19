// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
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
        // example: 'physical', 'digital'
      }
    },
    {
      tableName: 'products',
      freezeTableName: true,

      // ✅ auto timestamps
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  return Product;
};
