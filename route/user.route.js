const express = require('express')
const router = express.Router()


router.get('/login',userController.getLoginForm)
router.post('/login',userController.login)
router.get('/signup',userController.getSignupForm)
router.post('/signup',userController.signup)

module.exports = router