var moment = require("moment");
var postModel = require("../models/post");

exports.create = function(req, res) {
  const { title, content, tags } = req.body;
  const { _id } = req.user;

  postModel.create({ owner: _id, title, content, tags }, function(err, data) {
    if (err || !data) {
      return res.status(400).json({ message: err.message });
    }

    res.status(200).json(data);
  });
};

exports.getAll = function(req, res) {
  const { itemsPerPage = 3, currentPage = 1, filter = "" } = req.query;
  const qb = {
    limit: 1 * itemsPerPage,
    skip: (currentPage - 1) * itemsPerPage
  };

  if (filter.length > 0) {
    qb.$or = [
      { tags: { $regex: ".*" + filter + ".*", $options: "i" } },
      { title: { $regex: ".*" + filter + ".*", $options: "i" } }
    ];
  }

  postModel.find(qb, function(err, data) {
    if (err || !data) {
      return res.status(400).json({ message: err.message });
    }

    res.status(200).json(data);
  });
};

exports.addComment = function(req, res) {
  const { content, postId } = req.body;
  const { _id } = req.user;

  if (!postId) {
    return res
      .status(400)
      .json({ message: "The parameter 'postId' is required!" });
  }

  postModel.addComment({ _id: postId }, { owner: _id, content }, function(
    err,
    data
  ) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    res.status(200).json(data);
  });
};

exports.getDetail = function(req, res) {
  const { postId } = req.query;

  if (!postId) {
    return res
      .status(400)
      .json({ message: "The parameter 'postId' is required!" });
  }

  postModel.findOne({ _id: postId }, function(err, data) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    res.status(200).json(data);
  });
};
