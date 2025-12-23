const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("send get cmt");
  res.end(() => {
    "end get cmt";
  });
});
router.post("/", (req, res, next) => {
  res.send("send post cmt");
  res.end(() => {
    postID;
  });
});
router.put("/:commentID", (req, res, next) => {
  res.send("send put cmt");
  res.end(() => {
    postID, commentID;
  });
});
router.patch("/:commentID", (req, res, next) => {
  res.send("send patch cmt");
  res.end(() => {
    postID, commentID;
  });
});
router.delete("/:commentID", (req, res, next) => {
  res.send("send delete cmt");
  res.end(() => {
    postID, commentID;
  });
});

module.exports = router;
