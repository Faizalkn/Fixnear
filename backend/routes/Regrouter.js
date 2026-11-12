const express = require('express')
const router = express.Router()
const {registerPostData} = require('../controller/userRegisterController')
const{loginPostData} =require('../controller/loginController')
const {empRegGetData} = require('../controller/govEmpRegController')

router.route('/userreg') .post(registerPostData)
router.route('/employeereg').post(empRegGetData)
router.route('/login').post(loginPostData)


module.exports = router