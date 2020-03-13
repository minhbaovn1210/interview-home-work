var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [String],
  comments: [
    {
      owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
      content: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export Post model
var Post = (module.exports = mongoose.model("posts", postSchema));

module.exports = {
  find: function(query, callback) {
    Post.find(query)
      .sort({ created_at: -1 })
      .populate("owner", ["_id", "name"])
      .populate("comments.owner", ["_id", "name"])
      .exec(callback);
  },
  findOne: function(query, callback) {
    Post.findOne(query)
      .populate("owner", ["_id", "name"])
      .populate("comments.owner", ["_id", "name"])
      .exec(callback);
  },
  create: function({ owner, title, content, tags }, callback) {
    const newPost = new Post({ owner, title, content, tags });
    newPost.save(callback);
  },
  addComment: function(query, values, callback) {
    Post.findOneAndUpdate(
      query,
      {
        $push: {
          comments: values
        }
      },
      { new: true }
    )
      .populate("owner", ["_id", "name"])
      .populate("comments.owner", ["_id", "name"])
      .exec(callback);
  }
};
