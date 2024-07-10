const jwt = require('jsonwebtoken');
// import { JWT_SECRET } from '../config/config';
const JWT_SECRET = require('../config/config')
const auth = (req, res, next) => {
    const token = req.header('token');

    var responseData = {};

    if (!token) {
        responseData["message"] = "Authentication Failed"
        return res.send(responseData);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        responseData["message"] = "Token is not valid"
        return res.send(responseData);
    }


}

module.exports = auth
