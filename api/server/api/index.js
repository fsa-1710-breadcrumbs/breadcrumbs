const router = require('express').Router();

module.exports = router;

//  heroku.com/api/user
router.use('/users', require('./user'));
//  heroku.com/api/trail
router.use('/trails', require('./trail'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
