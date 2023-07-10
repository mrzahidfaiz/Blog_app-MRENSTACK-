const mongoose = require('mongoose');

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
    token: {type: String, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'} //Fixes 
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('RefreshSchema', RefreshTokenSchema, 'tokens');