const express = require('express')
const router = express.Router()
const {registerPostData} = require('../controller/userRegisterController')
const{loginPostData} =require('../controller/loginController')
const {empRegPostData} = require('../controller/govEmpRegController')
const userUpload = require('../middleware/regMulter')
const govEmpUpload = require('../middleware/govEmpMulter')

router.route('/reg').post(
    userUpload.fields([
        { name: 'profilepic', maxCount: 1 },
        { name: 'idproof', maxCount: 1 },
    ]),
    registerPostData
)
router.route('/employeereg').post( govEmpUpload.fields([
        { name: 'idproof', maxCount: 1 },
    ]),

    empRegPostData)
router.route('/login').post(loginPostData)


module.exports = router
