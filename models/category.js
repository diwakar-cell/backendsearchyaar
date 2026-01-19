// models/category.js
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
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
      }
    },
    {
      tableName: 'categories',
      freezeTableName: true,

      // ✅ automatically adds and fills timestamps
      timestamps: true,

      // ✅ custom column names
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  return Category;
};
