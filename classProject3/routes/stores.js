var express = require('express');
var router = express.Router();

const storesController = require('../controllers/storesController');
const store = new storesController();

/* 가게 등록 */
router.post('/', store.registerStore);

// 내 주변 가게 표시
router.get('/selectStore', store.selectStore);

// router.
module.exports = router;