const Sequelize = require('sequelize');
const db = require('../db');

const Trail = db.define('trail', {
  startCrumb: { // work with Corey on getting all the crumbs
    type: Sequelize.JSON // array of JSONB **
  },
  endCrumb: {
    type: Sequelize.JSON
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Trail;
