const Friends = require('../models/friendsModel');
exports.createFriend = async (req, res) => {
    try {
        const { facebookId, friends, profileId } = req.body;

        if (!Array.isArray(friends)) {
            return res.status(400).json({ message: 'Friends must be an array' });
        }

        const existingFriend = await Friends.findOne({ profileId });

        if (existingFriend) {
            existingFriend.friends = friends;
            await existingFriend.save();
            return res.status(200).json({ message: 'Friends list updated', friend: existingFriend });
        } else {
            const newFriendRecord = new Friends({
                facebookId: facebookId || null,
                friends,
                profileId,
            });
            await newFriendRecord.save();
            return res.status(201).json(newFriendRecord);
        }
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Error creating or updating friends', error: error.message });
    }
};
exports.getFriends = async (req, res) => {
    try {
        const { profileId } = req.params;

        if (!profileId) {
            return res.status(400).json({
                message: 'Profile ID is required' 
            });
        }
        const friendRecord = await Friends.findOne({ profileId });

        if (!friendRecord) {
            return res.status(404).json({ 
                message: 'No friends found for this profile'
            });
        }

        return res.status(200).json({
            friends: friendRecord.friends 
        });

    } catch (error) {
        console.error('Error retrieving friends:', error);
        res.status(500).json({ message: 'Error retrieving friends', error: error.message });
    }
};

