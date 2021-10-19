const router = require('express').Router();
require('dotenv').config()

const {
    registerController,
    loginController,
    profileController,
    showController

} = require('../modules/controller');


//Register
router.post('/register', registerController);

//Login
router.post('/login', loginController);


router.get('/profile', showController);

    


module.exports = router;