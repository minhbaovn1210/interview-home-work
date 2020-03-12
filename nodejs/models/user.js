var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  dob: Date,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Export User model
var User = (module.exports = mongoose.model("users", userSchema));

module.exports = {
  findOne: function(params, callback) {
    User.findOne(params)
      .select("-password")
      .exec(callback);
  },
  insert: function({ username, password, dob, name }, callback) {
    const newUser = new User({ username, password, dob, name });
    newUser.save(callback);
  },
  findOneAndUpdate: function(query, values, callback) {
    User.findOneAndUpdate(query, values, { new: true }, callback);
  }
};
