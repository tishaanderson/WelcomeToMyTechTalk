const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });    
  }
});

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching and rendering blogs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;