const mongoose = require("mongoose");

const { Schema } = mongoose;

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    category: { type: String, required: true },
    photoPath: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", BlogSchema, "blogs");
