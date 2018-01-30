const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/breadcrumbs', {
  logging: false,
});
module.exports = db;
