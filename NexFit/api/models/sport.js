const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

module.exports = mongoose.model(
  "sport",
  new mongoose.Schema(
    {
      name: String,
      number: Number,
    },
    { collection: "sport" }
  )
);
