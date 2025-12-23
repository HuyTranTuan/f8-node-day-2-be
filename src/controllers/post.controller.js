const postModel = require("../models/post.model");

const getAll = (req, res) => {
  const posts = postModel.findAll();
  posts ? res.success(posts, 200) : res.error("Not found", 404);
};

const getOne = (req, res) => {
  const post = postModel.findOne(req.params.id);
  post ? res.success(post, 200) : res.error("Not found", 404);
};

const create = (req, res) => {
  const newPost = postModel.create(req.body);
  newPost.status === 409
    ? res.error(newPost.data, newPost.status)
    : res.success(newPost.data, newPost.status);
};

const update = (req, res) => {
  const postUpdate = postModel.update(req.params.id, req.body);
  postUpdate.status === 404
    ? res.error(postUpdate.data, postUpdate.status)
    : res.success(postUpdate.data, postUpdate.status);
};

const del = (req, res) => {
  const deletePost = postModel.del(req.params.id);
  deletePost.status === 404
    ? res.error(deletePost.data, deletePost.status)
    : res.success(deletePost.data, deletePost.status);
};

module.exports = { getAll, getOne, create, update, del };
