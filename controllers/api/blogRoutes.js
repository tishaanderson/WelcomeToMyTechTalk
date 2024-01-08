const router = require("express").Router();
const { Blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });    
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching and rendering blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;