const router = require('express').Router();
const { User, Trail } = require('../db/models');

module.exports = router;

router.get('/trails', (req, res, next) => {
  Trail.findAll()
  .then(foundTrails => {
    res.json(foundTrails)
  })
  .catch(next);
});
