const RegisterUser = require("../models/userSchema")
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/config')
const user_register = async (req, res) => {

    var responseData = {};

    try {

        const existingUser = await RegisterUser.findOne({ email: req.body.email });

        if (existingUser) {
            responseData["error"] = true;
            responseData["message"] = "User already exists";
            responseData["code"] = 401;

            return res.send(responseData);
        }

        const uniqueId = uuidv4();

        var jsonData = {};
        jsonData["id"] = uniqueId;
        jsonData["username"] = req.body.username;
        jsonData["email"] = req.body.email;
        jsonData["password"] = req.body.password;
        jsonData["connected"] = req.body.connected;

        const newUser = new RegisterUser(jsonData)

        const savedUser = await newUser.save();

        responseData["error"] = false;
        responseData["message"] = "User Registered Successfully";
        responseData["code"] = 200;

        res.send(responseData)

    }
    catch (err) {
        responseData["error"] = true;
        responseData["message"] = "Server Error";
        responseData["code"] = 500;
        res.send(responseData)
    }

}

const user_login = async (req, res) => {
    console.log(req.body)

    var responseData = {};

    try {

        const { email, password } = req.body

        const user = await RegisterUser.findOne({ email });
        if (!user) {
            responseData["error"] = true;
            responseData["message"] = "Invalid Credentials";
            responseData["code"] = 401;
            return res.send(responseData);
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            responseData["error"] = true;
            responseData["message"] = "Invalid Credentials";
            responseData["code"] = 401;
            return res.send(responseData);
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' })

        responseData["error"] = false;
        responseData["message"] = "User Login Successfully";
        responseData["code"] = 200;
        responseData["token"] = token;

        res.send(responseData)

    }
    catch (err) {
        responseData["error"] = true;
        responseData["message"] = "Server Error";
        responseData["code"] = 500;
        res.send(responseData)
    }

}


module.exports.user_register = user_register;
module.exports.user_login = user_login;