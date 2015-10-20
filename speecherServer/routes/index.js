var express = require('express');
var router = express.Router();
var session = require('express-session');


var login = require('./snsLogin');
var saveScript = require('./saveScript');
var readScript = require('./readScript');
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

router.get('/login/facebook', login.facebookLogin);
router.get('/login/google', login.googleLogin);
router.get('/main/scriptSave', saveScript.saveScriptExpress);
router.get('/main/scriptList', readScript.readScriptList);


module.exports = router;
