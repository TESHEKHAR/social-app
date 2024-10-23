require('dotenv').config();

module.exports = {
    facebookAuth: {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
       
    },
    jwtSecret:process.env.JWT_SECRET
}