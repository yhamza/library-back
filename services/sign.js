const Admin=require('../models/Admin')
const jwt=require('jsonwebtoken')
const dbConnection = require("../config/database");
const asyncHandler = require('express-async-handler')
const bcrypt=require('bcryptjs')
exports.signup = asyncHandler(async (req, res) => {
    // 1- Create admin
    const newAdmin = new Admin({
        email: req.body.email,
        password:await bcrypt.hash(req.body.password,12),
    });
    await newAdmin.save()
    console.log("admin created ")

    // 2- Generate token
    const token = jwt.sign({ adminId: newAdmin.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE_TIME
    });
    res.status(201).json({ data: newAdmin, token });
});
