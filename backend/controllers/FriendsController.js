const Friends = require('../models/friendsModel');

exports.createFriend = async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        const { facebookId, friends ,profileId} = req.body;
        if (!Array.isArray(friends)) {
            return res.status(400).json({ message: 'Friends must be an array' });
        }

        const existingFriend = await Friends.findOne({
            $or: [
                { profileId: profileId || null}
            ]
        });

        if (existingFriend) {
            return res.status(409).json({ message: 'Friend record already exists' });
        }

        const newFriendRecord = new Friends({
            facebookId: facebookId || null,
            friends,
            profileId, 
        });
        await newFriendRecord.save();

        res.status(201).json(newFriendRecord);
    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Error creating or updating friends', error: error.message });
    }
};




