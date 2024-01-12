const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./user.json');
const blogData = require('./blog.json');
const commentData = require('./comment.json');
// const commentData = require('./comment.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for(const blog of blogData) {

    const associatedUser = users.find((user) => user.id === blog.user_id);

    if (associatedUser) {
      await Blog.create({
        ...blog,
        user_id: associatedUser.id,
      });
    } else {
      console.log(`User with id ${blog.user_id} not found`);
    }
  }
  
  process.exit(0);
};

seedDatabase();