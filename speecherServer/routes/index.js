var express = require('express');
var router = express.Router();
var session = require('express-session');


var facebook = require('./snsLogin');
/* GET home page. */

//세션 사용
router.use(session({
  secret: 'Soma',
  resave: false,
  saveUninitialized: true
}));

router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

router.get('/textlist', function (req, res) {
  res.render('textlist', {title: 'Express'});
});


router.get('/login/facebook', facebook.facebookLogin)


module.exports = router;
