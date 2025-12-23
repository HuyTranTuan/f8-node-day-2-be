const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");

router.get("/", postsController.getAll);
router.get("/:id", postsController.getOne);
router.post("/", postsController.create);
router.put("/:postID", postsController.create);
router.patch("/:postID", postsController.create);
router.delete("/:postID", postsController.del);

module.exports = router;
