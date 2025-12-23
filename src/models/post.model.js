const { loadDB, saveDB } = require("../utils/jsonDB");
const { v4: uuidv4 } = require("uuid");

let db = [];

loadDB().then((result) => {
  db = result;
});

const postModel = {
  findAll() {
    loadDB().then((result) => {
      db = result;
    });
    return db.posts;
  },
  findOne(id) {
    loadDB().then((result) => {
      db = result;
    });
    return db.posts.find((_post) => _post.id === id);
  },
  create(post) {
    const checkTitle = db.posts.find((_post) => _post.title === post.title);
    if (checkTitle) return { status: 409, data: checkTitle };
    const uniqueId = uuidv4();
    const ms = new Date(Date.now());
    const newPost = {
      id: uniqueId,
      title: post.title,
      content: post.content,
      createdAt: ms,
    };
    db.posts.push(newPost);
    saveDB(db);
    return { status: 201, data: newPost };
  },
  update(id, post) {
    const updatePost = db.posts.find((_post) => {
      if (_post.id === id) {
        _post.title = post.title;
        _post.content = post.content;
        return _post;
      }
    });
    if (updatePost) saveDB(db);

    return updatePost
      ? { status: 204, data: updatePost }
      : { status: 404, data: null };
  },
  del(id) {
    const post = db.posts.find((_post) => _post.id === id);
    if (!post) return { status: 404, data: null };
    db.posts = db.posts.filter((_post) => _post.id !== post.id);
    saveDB(db);
    return { status: 204, data: null };
  },
};

module.exports = postModel;
