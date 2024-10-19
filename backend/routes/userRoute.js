const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel'); 
const axios = require('axios');
const Post = require('../models/postModel');
const Friends = require('../models/friendsModel');
const fs = require('fs');
const path = require('path');
const friendsController = require('../controllers/FriendsController');


// Facebook authentication route
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email','user_friends']
}));

// Facebook OAuth callback
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: '/login'
}));

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('http://localhost:3000/');
    });
});

// router.get('/facebook/timeline', (req, res) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Access token is missing or invalid' });
//     }

//     const accessToken = authHeader.split(' ')[1];

//     axios.get('https://graph.facebook.com/me/feed', {
//         params: { access_token: accessToken }
//     })
//     .then(response => res.json(response.data))
//     .catch(error => {
//         console.error('Error fetching Facebook timeline:', error);
//         if (error.response && error.response.status === 400) {
//             res.status(400).json({ message: 'Invalid or expired access token' });
//         } else {
//             res.status(500).json({ message: 'Error fetching Facebook timeline' });
//         }
//     });
// });

// router.get('/facebook/timeline', (req, res) => {
//     // console.log(req.headers); // Log all headers to inspect what's being sent

//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Access token is missing or invalid' });
//     }

//     const accessToken = authHeader.split(' ')[1];
    
//     // Make Facebook API call using Axios
//     axios.get('https://graph.facebook.com/me/feed', {
//         params: {
//             access_token: accessToken,
//             fields: 'id,message,picture,from,shares,type,attachments'
//         }
//     })
//     .then(response => res.json(response.data))
//     .catch(error => {
//         console.error('Error fetching Facebook timeline:', error);
//         if (error.response && error.response.status === 400) {
//             res.status(400).json({ message: 'Invalid or expired access token' });
//         } else {
//             res.status(500).json({ message: 'Error fetching Facebook timeline' });
//         }
//     });
// });

// router.get('/facebook/timeline', async (req, res) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Access token is missing or invalid' });
//     }

//     const accessToken = authHeader.split(' ')[1];

//     try {
//         const response = await axios.get('https://graph.facebook.com/me/feed', {
//             params: {
//                 access_token: accessToken,
//                 fields: 'id,message,picture,from,shares,type,attachments'
//             }
//         });

//         const posts = response.data.data; 
//         let savedCount = 0;

//         const savePromises = posts.map(async post => {
//             const existingPost = await Post.findOne({ facebookId: post.id });
//             if (!existingPost) {
//                 await Post.create({
//                     facebookId: post.id,
//                     message: post.message || '', 
//                     picture: post.picture || '', 
//                     from: post.from ? post.from.name : '', 
//                     shares: post.shares ? post.shares.count : 0, 
//                     type: post.type,
//                     attachments: post.attachments ? post.attachments.data : [],
//                 });
//                 savedCount++;
//             }
//         });

//         await Promise.all(savePromises);
//         res.json({
//             message: `${savedCount} posts saved successfully to the database.`,
//             data: response.data
//         });
//     } catch (error) {
//         console.error('Error fetching Facebook timeline:', error);
//         if (error.response && error.response.status === 400) {
//             res.status(400).json({ message: 'Invalid or expired access token' });
//         } else {
//             res.status(500).json({ message: 'Error fetching Facebook timeline' });
//         }
//     }
// });

router.get('/facebook/timeline', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    const accessToken = authHeader.split(' ')[1];

    try {
        const response = await axios.get('https://graph.facebook.com/me/feed', {
            params: {
                access_token: accessToken,
                fields: 'id,message,picture,from,shares,type,attachments'
            }
        });

        const posts = response.data.data; 
        let savedCount = 0;

        const savePromises = posts.map(async post => {
            const existingPost = await Post.findOne({ facebookId: post.id });
            if (!existingPost) {
                let localImageUrl = '';
                if (post.picture) {
                    const imageResponse = await axios.get(post.picture, { responseType: 'arraybuffer' });
                    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
                    
                    const imageName = `${post.id}_${Date.now()}.jpg`;
                    const localPath = path.join(__dirname, 'uploads', imageName); 

                    fs.writeFileSync(localPath, imageBuffer);
                    localImageUrl = `http://localhost:8000/uploads/${imageName}`; 
                }

                await Post.create({
                    facebookId: post.id,
                    message: post.message || '', 
                    picture: post.picture || '', 
                    from: post.from ? post.from.name : '', 
                    shares: post.shares ? post.shares.count : 0, 
                    type: post.type,
                    attachments: post.attachments ? post.attachments.data : [],
                    localImageUrl: localImageUrl 
                });
                savedCount++;
            }
        });

        await Promise.all(savePromises);
        res.json({
            message: `${savedCount} posts saved successfully to the database.`,
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching Facebook timeline:', error);
        if (error.response && error.response.status === 400) {
            res.status(400).json({ message: 'Invalid or expired access token' });
        } else {
            res.status(500).json({ message: 'Error fetching Facebook timeline' });
        }
    }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});



// Fetch Facebook friends
router.get('/facebook/friends', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }
    const accessToken = authHeader.split(' ')[1];

    try {
        const response = await axios.get('https://graph.facebook.com/me/friends', {
            params: {
                access_token: accessToken,
                fields: 'id,name,picture'
            }
        });

        const friends = response.data.data;
        res.json({
            message: `Successfully fetched ${friends.length} friends`,
            friends: friends
        });
    } catch (error) {
        console.error('Error fetching Facebook friends:', error);
        if (error.response && error.response.status === 400) {
            res.status(400).json({ message: 'Invalid or expired access token' });
        } else {
            res.status(500).json({ message: 'Error fetching Facebook friends' });
        }
    }
});  

router.post('/friends', friendsController.createFriend);




module.exports = router;
