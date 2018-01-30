const User = require('./user');
const Trail = require('./trail');

Trail.belongsTo(User);
User.hasMany(Trail);

/*
Available instance methods:
.getUser
.setUser
.createUser
.getTrails
.setTrails
.createTrails
.addTrail
.addTrails
.removeTrail
.removeTrails
.hasTrail
.hasTrails
.countTrails
*/

module.exports = {
  User,
  Trail
};
