const mongoose = require('mongoose');

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
    token: {type: String, required: true},
    userId: {type: String, required: true}
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('RefreshSchema', RefreshTokenSchema, 'tokens');