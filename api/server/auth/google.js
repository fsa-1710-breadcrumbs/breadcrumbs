const passport = require('passport');
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db/models');

module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.');

} else {

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  };

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const photoUrl = profile.photos ? profile.photos[0].value : undefined;

    User.find({where: {googleId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({name, email, googleId, photoUrl})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done);
  });

  passport.use(strategy);

  router.get('/', passport.authenticate('google', {scope: 'email'}));

  router.get('/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

}
