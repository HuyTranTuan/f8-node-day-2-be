const { loadDB, saveDB } = require("../utils/jsonDB");
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
    const findPost = db.posts.find((_post) => _post.id === comment.postId);
    if (!findPost) return { status: 409, data: "Post does not exists!" };
    const uniqueId = uuidv4();
    const newcomment = {
      id: uniqueId,
      postId: comment.postId,
      content: comment.content,
    };
    db.comments.push(newcomment);
    saveDB(db);
    return { status: 201, data: newcomment };
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
    db.comments = db.comments.filter((_comment) => _comment.id !== comment.id);
    saveDB(db);
    return { status: 204, data: null };
  },
};

module.exports = commentModel;
