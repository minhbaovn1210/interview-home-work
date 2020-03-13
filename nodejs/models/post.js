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
  find: function({ skip = 0, limit = 3, ...query }, callback) {
    Post.find(query, null, { skip, limit })
      .sort({ created_at: -1 })
      .populate("owner", ["_id", "name"])
      .populate("comments.owner", ["_id", "name"])
      .exec(function(err, data) {
        if (err) return callback(err, null);

        Post.count(query).exec(function(err2, count) {
          if (err2) return callback(err2, null);

          callback(null, {
            data,
            pagination: {
              currentPage: parseInt(skip / limit, 10) + 1,
              totalPages:
                count % limit === 0
                  ? parseInt(count / limit, 10)
                  : parseInt(count / limit, 10) + 1,
              itemsPerPage: limit,
              totalItems: count
            }
          });
        });
      });
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
