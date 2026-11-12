const express = require('express')
const router = express.Router()
const {registerPostData} = require('../controller/userRegister')
const{loginPostData} =require('../controller/login')

router.route('/') .post(registerPostData)
router.route('/login').post(loginPostData)
router

module.exports = router