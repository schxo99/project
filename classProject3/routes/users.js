var express = require('express'); 
var router = express.Router();

const usersController = require('../controllers/usersController');
const user = new usersController();

/* 회원가입 */
router.post('/', user.signup);

//고객리스트 출력할일 없음
router.get('/:userId', user.getUser);

router.get('/getUserChk/:userType', user.getUserChk); 

// router.get('/getUser', user.getUser);
// router.get('/getUser', user.getUser);

// 로그인
router.post('/login', user.login);
// router.get('/', user.login);


module.exports = router;