const { Schema, model } = require("mongoose");

const page = new Schema({
  title: String,
  text: String,
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  menu: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Page", page);
