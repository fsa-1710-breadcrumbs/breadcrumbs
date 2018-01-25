const User = require('./user');
const Trail = require('./trail');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Trail.belongsTo(User);

// ---------One trail per user for now, but can be updated to many ----------
User.hasOne(Trail);
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