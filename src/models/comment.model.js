const { loadDB, saveDB } = require("../../utils/jsonDB");
const { v4: uuidv4 } = require("uuid");

let db = [];

loadDB().then((result) => {
  db = result;
});

const commentModel = {
  findAll() {
    loadDB().then((result) => {
      db = result;
    });
    return db.comments;
  },
  findOne(id) {
    loadDB().then((result) => {
      db = result;
    });
    return db.comments.find((_comment) => _comment.id === id);
  },
  create(comment) {
    const targetId = String(comment.postId || "")
      .trim()
      .toLowerCase();

    const findPost = db.posts.find(
      (_post) => String(_post.id).toLowerCase() === targetId
    );

    if (!findPost) {
      return { status: 404, data: "Post does not exist!" };
    }

    const newComment = {
      id: uuidv4(),
      postId: comment.postId.trim(),
      content: comment.content,
      createdAt: new Date(Date.now()),
    };
    db.comments.push(newComment);
    saveDB(db);
    return { status: 201, data: newComment };
  },
  update(id, comment) {
    const updatecomment = db.comments.find((_comment) => {
      if (_comment.id === id) {
        _comment.content = comment.content;
        return _comment;
      }
    });
    if (updatecomment) saveDB(db);

    return updatecomment
      ? { status: 204, data: updatecomment }
      : { status: 404, data: null };
  },
  del(id) {
    const comment = db.comments.find((_comment) => _comment.id === id);
    if (!comment) return { status: 404, data: null };
    db.comments = db.comments.filter(
      (_comment) => _comment.id.trim() !== comment.id.trim()
    );
    saveDB(db);
    return { status: 204, data: null };
  },
};

module.exports = commentModel;
