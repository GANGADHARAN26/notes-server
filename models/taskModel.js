const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: { type: "string" },
    task: {
      type: Array,
      required: true,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
    isremainder: {
      type: Boolean,
      default: false,
    },
    status:{
      type: String,
    },
    remainder: {
      type: String, 
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Task", taskSchema);
