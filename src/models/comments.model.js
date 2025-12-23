const { loadDB, writeDB } = require("../utils/jsonDB");

let commentID = 1;
let db = {};

loadDB().then((result) => {
  db = result;
});

const commentsModel = {
  findAll() {
    return db.comments;
  },
  findOne(id) {
    return db.comments.find((_comment) => _comment.id === id);
  },
  create(comment) {
    const newcomment = {
      id: commentID++,
      ...comment,
    };
    db.comments.push(newcomment);

    writeDB(db);

    return newcomment;
  },
  del(id) {
    const newDB = db.comments.filter((_comment) => _comment.id !== id);
    writeDB(newDB);
    return newDB;
  },
};
