const { request } = require('express');
const httpStatus = require('http-status-codes')
const pool = require('../middleware/db')
// 음식에 관한것
class item {
    // 음식등록
    async registerItem(req, res) {
    
        try{
            console.log("registerItem");
            console.log(req.body.storeId);
            const storeId = req.body.storeId ; //가게정보
            const itemName = req.body.itemName; //음식명
            const itemPrice = req.body.itemPrice; //판매가
            const itemDiscountPrice = req.body.itemDiscountPrice; //할인가
            const itemExpirationDate = req.body.itemExpirationDate; //유통기한
            const itemDeliveryDate = req.body.itemDeliveryDate; //최근유통된음식
            


            await pool.query('insert into item(storeId, itemName, itemPrice, itemDiscountPrice, itemExpirationDate, itemDeliveryDate) values(?, ?, ?, ?, ?, ?)', [storeId, itemName, itemPrice, itemDiscountPrice, itemExpirationDate, itemDeliveryDate])

            res.status(httpStatus.OK).send('음식등록 완료')
            }
        catch (error) {
            console.error(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    // 전체음식리스트 조회
    // async showItem(req, res) {

    //     try{
    //         console.log("showItem");
    //         // const itemId = req.params.itemId
    //         // const storeId = 
    //         const items = await pool.query('select * from item')
    //         // console.log(items)
    //         return res.status(httpStatus.OK).send(items[0])
    //     }
    //     catch (error) {
    //         console.erroe(error)
    //         res.status(gttpStatus.INTERNAL_SERVER_ERROR).send([])
    //     }
    // }

    //storeId로 음식 조회 / postman 주소값에 id를 더하면 됨
    // async storeShowItem(req, res) {

    //     try{
    //         const storeId = req.body.storeId//params
    //         const item = await pool.query('select * from item where storeId = ?', [storeId])
    //         // const mainInfo = {items : items[0]}
    //         // console.log(mainInfo)
    //         return res.status(httpStatus.OK).send(item[0])
    //     }
    //     catch (error) {
    //         console.erroe(error)
    //         res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
    //     }
    // }
    async storeShowItem(req, res) {
        const result = []

        try{
            console.log("storeShowItem");
            const storeId = req.params.storeId//params
            let item = await pool.query('select * from item where storeId = ?', [storeId])
            const storeLatitude = await pool.query('select storeLatitude from store where storeId = ?',[storeId])
            const storeLongitude = await pool.query('select storeLongitude from store where storeId = ?', [storeId])
            // const mainInfo = {items : items[0]}
            // console.log(mainInfo)
            result.push(storeLatitude[0][0], storeLongitude[0][0], item[0][0])
            // res.status(httpStatus.OK).send(storeLatitude[0], storeLongitude[0], item[0])
            res.status(httpStatus.OK).send(result)
        }
        catch (error) {
            console.erroe(error)
            res.status(gttpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    //특정항목 삭제
    async deleteItem(req, res){

        try{
            console.log("deleteItem");
            const itemId = req.params.itemId
            const items = await pool.query("delete from item where itemId=?", [itemId]);
            const itemsList = await pool.query("select * from item");
            // const showItems = await pool.query("select * from user");
            console.log(itemId)
            return res.send(itemsList[0]);
            // return res.send(items[0][0]);
        }
        catch (error) {
            console.log(error);
            return res.status(httpStatus).json(error);
        }
    }
//음식이름으로 음식조회
    async selectItem(req, res) {

        try{
            const itemName = req.body.itemName
            let item = await pool.query('select itemName, itemId, itemPrice from item where itemName = ?', [itemName])
            return res.status(httpStatus.OK).send(item[0])
        }
        catch (error) {
            console.erroe(error)
            res.status(gttpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }
//할인안하는 음식만 조회
    async selectDiscountItem(req, res) {

        try{
            const itemDiscountPrice = req.body.itemDiscountPrice //파라미터 없이 조회되서 필요없긴함
            let selectDiscountItem = await pool.query('select * from item where itemDiscountPrice = 0', [itemDiscountPrice])
            console.log(selectDiscountItem[0])
            return res.status(httpStatus.OK).send(selectDiscountItem[0])
        }
        catch (error) {
            console.erroe(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    // 할인음식만 조회 할인률 != 0
    async selectItemPrice(req, res) {

        try{
            const itemDiscountPrice = req.body.itemDiscountPrice //파라미터 없이 조회해서 필요없음
            let selectItemPrice = await pool.query('select * from item where itemDiscountPrice != 0', [itemDiscountPrice])
            return res.status(httpStatus.OK).send(selectItemPrice[0])
        }
        catch (error) {
            console.erroe(error)
            res.status(gttpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    async selectItem(req, res) {

        try{
            const storeId = req.params.storeId //파라미터 없이 조회되서 필요없긴함
            let selectDiscountItem = await pool.query('select * from item where itemDiscountPrice = 0 and storeId = ?', [storeId])
            console.log(selectDiscountItem[0])
            return res.status(httpStatus.OK).send(selectDiscountItem[0])
        }
        catch (error) {
            console.erroe(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    async selectDiscountItem(req, res) {
        try{
            const storeId = req.params.storeId //파라미터 없이 조회되서 필요없긴함
            let selectDiscountItem = await pool.query('select * from item where itemDiscountPrice != 0 and storeId = ?', [storeId])
            console.log(selectDiscountItem[0])
            return res.status(httpStatus.OK).send(selectDiscountItem[0])
        }
        catch (error) {
            console.erroe(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }
}
module.exports = item
