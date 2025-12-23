const { loadDB, writeDB } = require("../utils/jsonDB");

let postID = 1;
let db = {};

loadDB().then((result) => {
  db = result;
});

const postsModel = {
  findAll() {
    return db.posts;
  },
  findOne(id) {
    return db.posts.find((_post) => _post.id === id);
  },
  create(post) {
    const newPost = {
      id: postID++,
      userID: post.userID,
      title: post.title,
      slug: post.slug,
      comment: [],
    };
    db.posts.push(newPost);

    writeDB(db);

    return newPost;
  },
  del(id) {
    const newDB = db.posts.filter((_post) => _post.id !== id);
    writeDB(newDB);
    return newDB;
  },
};

module.exports = postsModel;
