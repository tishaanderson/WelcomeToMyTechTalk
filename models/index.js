//import model files
const User = require('./User');
const Blog = require('./Blog');

//build relationship between models
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

//export models
module.exports = { User, Blog }; 