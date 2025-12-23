const express = require("express");

const router = express.Router();

const commentsRoute = require("./comments.route");
const postsRoute = require("./posts.route");

router.use("/comments", commentsRoute);
router.use("/posts", postsRoute);

module.exports = router;
