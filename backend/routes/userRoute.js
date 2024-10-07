const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userModel'); 

// Facebook authentication route
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
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
        res.redirect('http://localhost:3000/'); // Redirect to the homepage or login page
    });
});
module.exports = router;
