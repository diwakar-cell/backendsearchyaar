// models/country.js
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    'Country',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'countries',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  Country.associate = (models) => {
    Country.hasMany(models.State, { foreignKey: 'country_id' });
  };

  return Country;
};
