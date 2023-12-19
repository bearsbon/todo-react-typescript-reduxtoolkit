const { Schema, model, default: mongoose } = require("mongoose");

const Todo = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Todo", Todo);
