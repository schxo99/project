const { request } = require('express');
const httpStatus = require('http-status-codes');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const pool = require('../middleware/db')

// 가게에 관한것
class store {
    // 가게등록
    async registerStore(req, res) {

        try{
            
            // const storeId = req.body.storeId;
            const storeId = req.body.storeId;
            const storeAddress = req.body.storeAddress;
            const storeName = req.body.storeName;
            const storeLatitude = req.body.storeLatitude;
            const storeLongitude = req.body.storeLongitude;

            await pool.query('insert into store(storeId, storeAddress, storeName, storeLatitude, storeLongitude) values(?, ?, ?, ?, ?)', [storeId, storeAddress, storeName, storeLatitude, storeLongitude])
            res.status(httpStatus.OK).send('가게등록완료')
        }

        catch (error) {
            console.error(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }

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
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    // 내주변 가게 표시
    async selectStore(req, res) {
        try{
            const result = [];
            const result2 = [];
            const userId = req.body.userId;
            const userLatitude = await pool.query('select userLatitude from user where userId = ?',[userId])
            const userLongitude = await pool.query('select userLongitude from user where userId = ?', [userId])
            const storeLatitude = await pool.query('select storeLatitude from user where userType != 0')
            const storeLongitude = await pool.query('select storeLongitude from store where storeLongitude is not null')
            // console.log(userLatitude[0][0].userLatitude)
            // console.log(userLongitude[0][0].userLongitude)
            // console.log(storeLatitude[0][0].storeLatitude)
            // console.log(storeLongitude[0][0].storeLongitude)
            for(var i = 0; i < storeLatitude.length+1; i++){
                const test = (Math.abs(userLatitude[0][0].userLatitude - storeLatitude[0][i].storeLatitude))+(Math.abs(userLongitude[0][0].userLongitude - storeLongitude[0][i].storeLongitude))
                if (test < 0.009){
                    result.push(await pool.query('select * from store where storeLatitude = ? and storeLongitude = ?', [storeLatitude[0][i].storeLatitude, storeLongitude[0][i].storeLongitude]))
                } else {
                    result.push(0)
                }
                result2.push(result[i][0])
            }
            res.status(httpStatus.OK).send(result2)
            // console.log(test)
            // if ((Math.abs(storeLatitude[0][0] - userLatitude)) + (Math.abs(storeLongitude[0][0] - userLongitude)) <= 0.009) {
            //     const selectStore = await pool.query('select storeId from store where storeLatitude = ?, storeLongitude = ?', [storeLatitude[0][0], storeLongitude[0][0]])
            //     console.log(selectStore[0])
            //     res.status(httpStatus.OK).send(selectStore[0])
            // }
            }

            // const selectStore = await pool.query('select storeId from store where abs(storeLatitude - ?) + abs(storeLongitude - ?) < 0.009', [userLatitude, userLongitude])
            // res.status(httpStatus.OK).send(selectStore[0])
        

        catch (error) {
            console.error(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }
}
module.exports = store