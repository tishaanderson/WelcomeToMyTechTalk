const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogData = await Blog.findByPk(blogId, { 
      include: [
        User,
        {
          model: Comment,
          include: [User]
        }]      
    });

    if (!blogData) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    const blog = blogData.get({ plain: true });
console.log(blog);
    res.render('blog', {
      blog,
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post('/blog/:id/comments', withAuth, async (req, res) => {
//   try {
//     const { text, user_id } = req.body;
//     const blogId = req.params.id;
//     const blog = await Blog.findByPk(blogId);
    
//     if (!blog) {
//       res.status(404).json({ message: 'Comment not found' });
//       return;
//     }

//     const newComment = await Comment.create({
//       text,
//       comment_date: new Date(),
//       user_id: req.session.user_id,
//       blog_id: blog.id,
//     });

//     res.status(201).json(newComment);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to create comment'});
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
