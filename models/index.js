// 'use strict';

// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');
// const { Sequelize, DataTypes } = require('sequelize');

// const basename = path.basename(__filename);
// const db = {};

// const isProd = process.env.NODE_ENV === 'production';

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   logging: true,
//   // ...(isProd && {
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     pool: {
//     max: 10,
//     min: 0,
//     acquire: 120000, // 30s
//     idle: 30000,    // 10s
//   },
//   // }),
// });

// // Test DB connection
// sequelize
//   .authenticate()
//   .then(() => console.log('✅ DB connected'))
//   .catch((err) => console.error('❌ DB connection failed:', err));

// // Load all models
// fs.readdirSync(__dirname)
//   .filter(
//     (file) =>
//       file !== basename &&
//       file.endsWith('.js')
//   )
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       DataTypes
//     );
//     db[model.name] = model;
//   });

// // Run model associations if any
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Export Sequelize + models
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const basename = path.basename(__filename);
const db = {};

const isProd = process.env.NODE_ENV === 'production';

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log, // change to false to disable logs
  pool: {
    max: 10,
    min: 0,
    acquire: 180000, // wait up to 3 minutes to get a connection
    idle: 30000,     // idle time before releasing a connection
  },
  dialectOptions: isProd
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // required for most cloud DBs like Render / Railway
        },
        statement_timeout: 180000, // 3 minutes for slow queries
      }
    : {},
});

// Test DB connection immediately
(async () => {
  try {
    await sequelize.authenticate();
    console.log(' DB connected successfully');
  } catch (err) {
    console.error(' DB connection failed:');
    console.error(err);
    process.exit(1); // stop server if DB cannot connect
  }
})();

// Load all models dynamically
fs.readdirSync(__dirname)
  .filter(
    (file) => file !== basename && file.endsWith('.js')
  )
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath)(sequelize, DataTypes);
    db[model.name] = model;
  });

// Run associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize instance + models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
