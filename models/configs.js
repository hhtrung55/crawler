const mongoose = require("../mongoose");

const schema = new mongoose.Schema(
  {
    pair: String,
    interval: String, // second
    nextTrackingTime: Date,
    gt: Number,
    lt: Number,
    note: String,
    groupId: String,
    groupName: String,
  },
  {
    timestamps: true,
  }
);

const Configs = mongoose.model("configs", schema);

// const initTest = new Configs({
//   pair: "BNB-BUSD",
//   interval: "10", // second
//   nextTrackingTime: Date,
//   gt: 100, // $
//   lt: 50, // $
// });

// initTest
//   .save()
//   .then(() => console.log("done"))
//   .catch(console.log);

schema.index({
  nextTrackingTime: 1,
});

schema.index(
  {
    pair: 1,
    interval: 1,
  },
  {
    unique: true,
  }
);

module.exports = Configs;
