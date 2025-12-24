const { loadDB, saveDB } = require("../../utils/jsonDB");
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
    if (!post.title) return { status: 400, data: post };
    const checkTitle = db.posts.find(
      (_post) => _post.title === post.title.trim()
    );
    if (checkTitle) return { status: 409, data: checkTitle };

    const newPost = {
      id: uuidv4(),
      title: post.title.trim(),
      content: post.content,
      createdAt: new Date(Date.now()),
    };
    db.posts.push(newPost);
    saveDB(db);
    return { status: 201, data: newPost };
  },
  update(id, post) {
    const updatePost = db.posts.find((_post) => {
      if (_post.id === id.trim()) {
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
    const post = this.findOne(id);
    if (!post) return { status: 404, data: null };
    db.posts = db.posts.filter((_post) => _post.id !== post.id);
    db.comments = db.comments.filter((_comment) => _comment.postId !== post.id);
    saveDB(db);
    return { status: 200, data: db };
  },
};

module.exports = postModel;
