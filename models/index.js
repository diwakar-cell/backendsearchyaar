'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const basename = path.basename(__filename);
const db = {};

const isProd = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: true,
  // ...(isProd && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  // }),
});

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log('✅ DB connected'))
  .catch((err) => console.error('❌ DB connection failed:', err));

// Load all models
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file !== basename &&
      file.endsWith('.js')
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
  });

// Run model associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize + models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;