const mongoose = require("../mongoose");

const schema = new mongoose.Schema(
  {
    top: Number,
    down: Number,
    user: {
      id: Number,
      first_name: String,
      last_name: String,
      username: String,
    },
  },
  {
    timestamps: true,
  }
);

const UsersConfig = mongoose.model("UsersConfig", schema);

schema.index(
  {
    "user.id": 1,
  },
  {
    unique: true,
  }
);

module.exports = UsersConfig;
