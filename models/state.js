// models/state.js
module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    'State',
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
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'states',
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  State.associate = (models) => {
    State.belongsTo(models.Country, { foreignKey: 'country_id' });
    State.hasMany(models.City, { foreignKey: 'state_id' });
  };

  return State;
};
