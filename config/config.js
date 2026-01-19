// const path = require('path');
// require('dotenv').config({ path: path.join(__dirname, '../.env') });

// module.exports = {
//   production: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: 5432,
//     dialect: 'postgres',
//     logging: true,
//   },

//   development: {
//     username: process.env.DB_USERNAME || 'postgres',
//     password: process.env.DB_PASSWORD || '12345678',
//     database: process.env.DB_NAME || 'searchyaar',
//     host: process.env.DB_HOST || 'localhost',
//     port: 5432,
//     dialect: 'postgres',
//   },

//   test: {
//     username: 'postgres',
//     password: '12345678',
//     database: 'authentication_test',
//     host: '127.0.0.1',
//     port: 5432,
//     dialect: 'postgres',
//   }
// };


const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: true,
  },

  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },

  test: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  }
};

