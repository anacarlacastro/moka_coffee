var express = require('express');
var router = express.Router();

// moka - about
router.get('/', function(req, res, next) {
  res.render('mokashop');
});

module.exports = router;