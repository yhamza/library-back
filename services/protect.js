const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');

exports.protect = asyncHandler(async (req, res, next) => {
    // 1) Check if token exists, if it exists, get it
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('library')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).send("You are not logged in");
    }

    try {
        // 2) Verify token (no change happens, expired token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 3) Check if admin exists
        const currentAdmin = await Admin.findById(decoded.adminId);
        if (!currentAdmin) {
            return res.status(401).send("You are not logged in");
        }
        
        req.admin = currentAdmin;
        next();
    } catch (error) {
        res.status(401).send("You are not logged in");
    }
});
