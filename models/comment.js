const mongoose = require('mongoose');

const {Schema} = mongoose;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'Blog'
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'User'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Comment', CommentSchema, 'comments');