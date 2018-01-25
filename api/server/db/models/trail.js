const Sequelize = require('sequelize');
const db = require('../db');

const Trail = db.define('trail', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
  },
  //WE WILL NEED TO UPDATE THIS FOR A USER
  lng: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Trail;