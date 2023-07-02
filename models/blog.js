const mongoose = require("mongoose");

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    photoPath: { type: String, required: true },
    auhtor: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', BlogSchema, 'blogs');