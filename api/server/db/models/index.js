const User = require('./user');
const Trail = require('./trail');

Trail.belongsTo(User);
User.hasOne(Trail);

// ---------One trail per user for now, but can be updated to many later ----------

// From template:
// User.belongsToMany(Memory, { as: 'viewedMemories', through: 'memoryViews', foreignKey: 'viewerId' });
// Memory.belongsToMany(User, { as: 'viewers', through: 'memoryViews', foreignKey: 'viewedMemoryId' });
// This will add methods: memory.getViewers(), memory.setViewers, memory.addViewer,
//   memory.addViewers, user.getViewedMemories, user.setViewedMemories,
//   user.addViewedMemory, and user.addViewedMemories
// user.addViewedMemory(memory)
// memory.addViewer(user)

module.exports = {
  User,
  Trail
};
