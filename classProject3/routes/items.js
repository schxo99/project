var express = require('express');
var router = express.Router();

const itemsController = require('../controllers/itemsController');
const item = new itemsController();

/* 음식 등록 */
router.post('/', item.registerItem);

// 등록된 전체음식보여주기 아마 쓸일 없음
// router.get('/', item.showItem);

//storeId(key)인 음식들(value)
// router.get('/storeShowItem/:storeId', item.storeShowItem); //:
// router.get('/storeShowItem/:storeId', item.storeShowItem); //:


//itemDiscountPrice 할인음식만 조회 & storeId
router.get('/selectItem/:storeId', item.selectItem);
//selectItem
router.get('/selectDiscountItem/:storeId', item.selectDiscountItem); 

//itemId로 투플 삭제
router.delete('/:itemId', item.deleteItem);

// itemName으로 음식조회
// router.get('/selectItem', item.selectItem);

//itemDiscountPrice 할인음식만 조회
// router.get('/selectDiscountItem', item.selectDiscountItem);

// itemPrice 할인안하는 음식만 조회
// router.get('/selectItemPrice', item.selectItemPrice);

// router.
module.exports = router;