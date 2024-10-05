const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    facebookId: {
        type: String,
        required: true,
        unique: true
    },
    displayName: String,
    email: String,
    photo: String,
    accessToken:String,
    refreshToken:String,
    role: {
        type: String,
        default: 'user' 
    }
}, {timestamps: true});

const User = mongoose.model('User',userSchema);

module.exports = User;