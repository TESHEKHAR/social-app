const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require('../models/userModel');
const config = require('./config');

passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: ['id', 'displayName', 'email', 'photos', 'name']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            user = new User({
                facebookId: profile.id,
                displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : null,
                photo: profile.photos ? profile.photos[0].value : null,
                accessToken: accessToken,
                refreshToken: refreshToken || '',
            });
            await user.save();
        } else {
            user.accessToken = accessToken;
            user.refreshToken = refreshToken || user.refreshToken; 
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;
