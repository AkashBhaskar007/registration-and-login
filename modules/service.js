
const User = require('../models/user')
const jwt = require('jsonwebtoken');




exports.profileDataService = async(token)=>{
jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    console.log('decoded', decoded)
    let user = await User.findById(decoded.id, 'firstName lastName phonenumber')
    console.log(user);
    if (!user)
        return false;
    return user;
});
}
