const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/modelAuth');

// Add User; POST /api/users; Public
const addUser = asyncHandler(async (req,res)=>{
    const { username, email_Address, password, admin } = req.body;

    if(!username || !email_Address || !password) {
        res.status(400);
        throw new Error('ERR: empty fields(s)');
    }

    const usernameExists = await User.findOne({email_Address});

    if(usernameExists) {
        res.status(400);
        throw new Error('ERR: User Already Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        email_Address,
        password: hashedPassword,
        admin
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email_Address: user.email_Address,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error("ERR: Invalid User Data");
    }
})

// Login User; POST /api/users/login; Public
const  loginUser = asyncHandler(async (req, res) => {
    const {email_Address, password} = req.body;
    // res.status(200).json({email_Address});

    // Check for user email
    const user = await User.findOne({email_Address})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email_Address: user.email_Address,
            admin: user.admin,
            token: generateToken(user._id)
        })
    } else {
        res.status(403);
        throw new Error("ERR: Invalid Credentials");
    }
})

// Get User Data; GET /api/users/this; Private
const getThisuser = asyncHandler(async (req, res) => {
    const {_id, username, email_Address} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        username,
        email_Address
    })
})

// Generate JSON Web Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { addUser, loginUser, getThisuser };