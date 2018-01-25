const Sequelize = require('sequelize');
const db = require('../db');

const Trail = db.define('trail', {
  breadcrumbs: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Trail;
