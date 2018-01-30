const User = require('./user');
const Trail = require('./trail');

Trail.belongsTo(User); // future proof: have users access trails; trail belongs to user as creator ("as")
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
