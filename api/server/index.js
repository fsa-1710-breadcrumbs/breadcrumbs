const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');

const db = require('./db');

const PORT = process.env.PORT || 1337;
const app = express();

module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../../Secrets');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.models.user.findById(id)
    .then(user => done(null, user))
    .catch(done));

const createApp = () => {

  app.use(morgan('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(compression());

  app.use(session({
    secret: process.env.SESSION_SECRET || 'matcha',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
      if (path.extname(req.path).length) {
        const err = new Error('Not found');
        err.status = 404;
        next(err);
      } else {
        next();
      }
    });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });

  // app.get('/', (req, res, next) => {
  //   res.sendFile(path.join(__dirname, 'index.html'));
  // });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  const server = app.listen(PORT, () => console.log(`Listening on http://localhost:${server.address().port}`));

  // Future implementation:  set up our socket control center here if we use it.
};

const syncDb = () => db.sync();

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  syncDb()
    .then(createApp)
    .then(startListening);
} else {
  createApp();
}
