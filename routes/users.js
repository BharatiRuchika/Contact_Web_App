var express = require('express');
var router = express.Router();
var user = require("../module/user")
var {isAuthenticatedUser} = require("../middlewares/auth")
/* GET users listing. */

router.post('/login', user.LoginUser);
router.post('/register',user.registerUser );
router.post('/sendMessage',isAuthenticatedUser,user.sendMessage);
// router.get('/getMessage',isAuthenticatedUser,user.getMessages);
module.exports = router;
