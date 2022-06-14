const { request } = require('express');
const httpStatus = require('http-status-codes');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const { query } = require('../middleware/db');
const pool = require('../middleware/db')

// 회원에관한것
class user {
    // 회원가입 등록
    async signup(req, res) {
        try{
            const userId = req.body.userId;
            const userName = req.body.userName;
            const userPw = req.body.userPw;
            const userType = req.body.userType;
            const userLatitude = req.body.userLatitude;
            const userLongitude = req.body.userLongitude;
            const storeId = req.body.storeId;
            const storeName = req.body.storeName;

            await pool.query('insert into user(userId, userName, userPw, userType, userLatitude, userLongitude, storeId, storeName) values(?, ?, ?, ?, ?, ?, ?, ?)', [userId, userName, userPw, userType, userLatitude, userLongitude, storeId, storeName])

            res.status(httpStatus.OK).send('회원가입완료')
        }
        catch (error) {
            console.error(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send()
        }
    }
// id로 사용자조회
    async getUser(req, res) {
        try{
            const userId = req.params.userId
            const user = await pool.query('select * from user where userId = ?', [userId])
            return res.status(httpStatus.OK).send(user[0])
        }
        catch (error) {
            console.error(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }

    async getUserChk(req, res) {
        try{
            const userType = req.params.userType
            const type = await pool.query('select * from user where userType = ?', [userType])
            return res.status(httpStatus.OK).send(type[0])
        }
        catch (error) {
            console.error(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
        }
    }
    
//로그인
    async login(req, res){
        try{
            
            const userId = req.body.userId;
            const userPw = req.body.userPw;
            let userPwOk = await pool.query('select userPw from user where userId = ?', [userId])
            console.log("userPw : "+userPw);
            console.log(userPwOk[0][0].userPw);
            if(userPw == userPwOk[0][0].userPw){
                return res.status(httpStatus.OK).send('로그인 되었습니다.')
            }else{
                return res.status(httpStatus.OK).send('잘못된 정보입니다.')
            }
        }
        catch (error) {
            console.error(error)
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('확인할 수 없는 정보입니다.')
        }
    }

}
module.exports = user














    //음식이름으로 음식조회