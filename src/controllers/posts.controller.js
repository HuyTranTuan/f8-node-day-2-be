const postsModel = require("../models/posts.model");

const getAll = (req, res) => {
  const posts = postsModel.findAll();
  res.success(posts);
};

const getOne = (req, res) => {
  const post = postsModel.findOne(+req.params.id);
  res.success(post);
};

const create = (req, res) => {
  const newPost = postsModel.create({
    id: 2,
    userID: 1,
    title: req.body.title,
    slug: req.body.slug,
    comments: [],
  });
  res.success(newPost, 201);
};

const del = (req, res) => {
  res.success();
};

module.exports = { getAll, getOne, create, del };
