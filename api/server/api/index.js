const router = require('express').Router();

module.exports = router;

//  heroku.com/api/user
router.use('/users', require('./user'));

const { Trail } = require('../db/models');
router.get('/trails', (req, res, next) => {
  Trail.findAll()
  .then(foundTrails => {
    res.json(foundTrails)
  })
  .catch(next);
});

//  heroku.com/api/trail
// might add in later to be RESTful:  /user/1/trail/1 - lists all my trails
// router.use('/trails', require('./trail'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
