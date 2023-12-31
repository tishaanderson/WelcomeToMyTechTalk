const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

router.use('/users', userRoutes);
// /api/blogs
router.use('/blogs', blogRoutes);

module.exports = router;