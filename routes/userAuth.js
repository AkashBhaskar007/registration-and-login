const router = require('express').Router();
require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
    registerController,
    loginController,

} = require('../modules/controller');


//Register
router.post('/register', registerController);

//Login
router.post('/login', loginController);

router.get('/profile', (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        console.log('decoded', decoded)
        let user = await User.findById(decoded.id, 'firstName lastName phonenumber')
        res.json({ user })

    });
})



module.exports = router;