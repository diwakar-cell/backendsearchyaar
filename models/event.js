// models/event.js
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    'Event',
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
        // example: 'conference', 'webinar', 'workshop'
      }
    },
    {
      tableName: 'events',
      freezeTableName: true,

      // ✅ auto timestamps
      timestamps: true,
      createdAt: 'created_At',
      updatedAt: 'updated_At'
    }
  );

  return Event;
};
