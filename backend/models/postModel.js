const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    facebookId: { type: String, required: true },
    message: String,
    picture: String,
    from: String,
    shares: Number,
    type: String,
    localImageUrl: String,
    attachments: Array,
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
 