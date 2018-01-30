const router = require('express').Router();
const User = require('../db/models/user');

module.exports = router;

router.put('/login', (req, res, next) => {
  const passwordAttempt = req.body.password;
  delete req.body.password;
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found');
      } else if (!user.correctPassword(passwordAttempt)) {
        res.status(401).send('Incorrect password');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  delete req.body.isAdmin;
  delete req.body.salt;
  User.create(req.body)
    .then(user => {
      req.login(user, err => (err ? next(err) : res.json(user)));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists');
      } else {
        next(err);
      }
    });
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(204);
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
