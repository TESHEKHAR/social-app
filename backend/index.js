require('dotenv').config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/facebook");
const routes = require("./routes/userRoute");
const config = require('./config/config');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const cors = require('cors'); 
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

connectDB();

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); 

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
    cb(null, { _id: user._id });
});

passport.deserializeUser(async (obj, cb) => {
    try {
        const user = await User.findById(obj._id);
        cb(null, user);
    } catch (err) {
        cb(err, null);
    }
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your extension's URL
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));

// Use your routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
