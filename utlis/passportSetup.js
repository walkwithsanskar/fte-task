const dotenv = require("dotenv");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User'); 
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
    if (currentUser) {
      done(null, currentUser);
    } else {
      new User({
        fName: profile.name.givenName,
        lName: profile.name.familyName,
        email: profile.emails[0].value,
        method: 'google'
      }).save().then((newUser) => {
        done(null, newUser);
      });
    }
  });
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name']
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
    if (currentUser) {
      done(null, currentUser);
    } else {
      new User({
        fName: profile.name.givenName,
        lName: profile.name.familyName,
        email: profile.emails[0].value,
        method: 'facebook'
      }).save().then((newUser) => {
        done(null, newUser);
      });
    }
  });
}));
