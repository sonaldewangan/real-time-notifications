const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/protected', auth, (req, res) => {

    var responseData = {};
            responseData["message"] = "Authentication Failed"

    res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
});

module.exports = router;
