const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const saltRounds = 10;

exports.registerController = async (req, res) => {
    let { firstName, lastName, phonenumber, password } = req.body;
    if (!firstName) {
        return res.status(400).json({ message: "first name is required!" })
    }
    if (!lastName) {
        return res.status(400).json({ message: "last name is required!" })
    }
    if (!phonenumber) {
        return res.status(400).json({ message: "phone number is required!" })
    }
    if (!password) {
        return res.status(400).json({ message: "password is required!" })
    }
    let user = await User.findOne({ phonenumber })
    if (user) {
        return res.status(400).json({ message: "Phone number already in use!" })
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
        User.create({
            firstName,
            lastName,
            phonenumber,
            password: hash
        }).then(user => {
            return res.json({
                message: "User has registered successfully",
                
            })
        }).catch(err => {
            console.log('Error -> ', err);
            return res.status(403).json({
                message: 'Something went wrong!'
            })
        })
    });
}

exports.loginController = async (req, res) => {
    let { phonenumber, password } = req.body;
    if (!phonenumber) {
        return res.status(400).json({ message: "phonenumber is required!" })
    }
    if (!password) {
        return res.status(400).json({ message: "password is required!" })
    }
    let user = await User.findOne({ phonenumber })
    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = jwt.sign({
                    id: user._id,
                    name: user.name
                }, process.env.SECRET)
                res.json({
                    message: "Login Successfull",
                    token
                })
            } else {
                res.status(401).json({ message: "Invalid Password!" })
            }
        });
    } else {
        return res.status(401).json({ message: "User not found!" })
    }
}

exports.showController = async (req, res) => {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        console.log('decoded', decoded)
        let user = await User.findById(decoded.id, 'firstName lastName phonenumber')
        res.json({ user })

    });
}