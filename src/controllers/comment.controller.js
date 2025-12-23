const commentModel = require("../models/comment.model");

const getAll = (req, res) => {
  const comments = commentModel.findAll();
  comments ? res.success(comments, 200) : res.error("Not found", 404);
};

const getOne = (req, res) => {
  const comment = commentModel.findOne(req.params.id);
  comment ? res.success(comment, 200) : res.error("Not found", 404);
};

const create = (req, res) => {
  const newComment = commentModel.create(req.body);
  newComment.status === 409
    ? res.error(newComment.data, newComment.status)
    : res.success(newComment.data, newComment.status);
};

const update = (req, res) => {
  const postUpdate = commentModel.update(req.params.id, req.body);
  postUpdate.status === 404
    ? res.error(postUpdate.data, postUpdate.status)
    : res.success(postUpdate.data, postUpdate.status);
};

const del = (req, res) => {
  const deleteComment = commentModel.del(req.params.id);
  deleteComment.status === 404
    ? res.error(deleteComment.data, deleteComment.status)
    : res.success(deleteComment.data, deleteComment.status);
};

module.exports = { getAll, getOne, create, update, del };
