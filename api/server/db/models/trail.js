const Sequelize = require('sequelize');
const db = require('../db');

const Trail = db.define('trail', {
  breadcrumbs: {
    type: Sequelize.ARRAY(Sequelize.JSONB)
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Trail;
