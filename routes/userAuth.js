const router = require('express').Router();
require('dotenv').config()


const {
    registerController,
    loginController,
    profileController

} = require('../modules/controller');


//Register
router.post('/register', registerController);

//Login
router.post('/login', loginController);


router.get('/profile', profileController); 

module.exports = router;