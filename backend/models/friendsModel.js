const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    facebookId: { type: String, required: false },
    friends: [
        {
            name: String,
            imageUrl: String,
            mutualFriends: String,
            profileLink: String,
            createAt: { type: Date, default: Date.now },
        }
    ],
});

const Friends = mongoose.model('Friends', FriendsSchema);

module.exports = Friends;


   