var express = require('express');
var router = express.Router();
var session = require('express-session');


var login = require('./snsLogin');
var saveScript = require('./saveScript');
var readScript = require('./readScript');
var deleteScript = require('./deleteScript');
var testHistory = require('./testHistory');
var getRecord = require('./getRecord');
/* GET home page. */



//세션 사용
router.use(session({
  secret: 'Soma',
  resave: false,
  saveUninitialized: true
}));

// 최상위  Path 로드
var path = process.cwd();

router.get('/', function (req, res) {
  //views/index.jade 을 렌더링
  res.render('index', {title: 'Express'});
});

//   Angular의 router를 사용할 경우,해시뱅으로 원하는 부분의 뷰를 변경하게 되는데,  이 때 뷰 파일을(html)요청하기 위한 node 단의  static file load  URL
router.get('/partials/:name', function (req, res, next) {
  console.log("========path:" + path);
  console.log("========name:" + req.params.name);
  //res.render(path+'/templates/partials/'+req.params.name);
  res.render(path + '/views/partials/' + req.params.name);
});


router.get('/login/facebook', login.facebookLogin);
router.get('/login/google', login.googleLogin);
router.post('/main/scriptSave', saveScript.saveScriptExpress);
router.post('/main/scriptList', readScript.readScriptList);
router.post('/main/scriptDelete', deleteScript.deleteScriptExpress);
router.post('/scriptDetail/scriptContent', readScript.readScriptDetail);
router.post('/scriptDetail/scriptGrapeScores', testHistory.testHistory);
router.post('/test/getRecordPath', getRecord.getRecord);
//Angular 의  Html5Mode 를  true 로 설정하면, ajax로 요청한 페이지를 해시뱅으로 httpResponse인척 속이는 것을 넘어서서,  Ajax 요청한 것을 해시뱅이 사라진 실주소같은 형태로 만들어버린다.
// 이 때, 해시뱅 없이 만들어진  URL 로도 접근할 수 있게 하려면, 결국  # 이 없어진 url로 접속시  기본 인덱스 페이지를 redirect 해주고, data parameter 에 속성값을 넣어  JS로 응답해줄 수 있을 것 같다
// 이보다 더 나은 방법이 있는지는 아직 잘 모르겠음
//해시뱅이 사라진 주소로 HttpResponse요청 시, 실제 원하는 데이터를  Response 해준다
router.get('/:name', function (req, res) {
  var name = req.params.name;
  //res.redirect('/',{'hashbang':'angular-route-url'});
  res.redirect('/' + '#/' + name);
});
module.exports = router;
