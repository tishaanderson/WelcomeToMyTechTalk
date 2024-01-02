const router = require("express").Router();
const { Blog } = require("../../models");

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