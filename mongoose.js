const mongoose = require("mongoose");
require("dotenv").config();

let mongoUrl = process.env.MONGODB;

console.log("mongoUrl", mongoUrl);

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.error(error);
    }
  }
);

module.exports = mongoose;
