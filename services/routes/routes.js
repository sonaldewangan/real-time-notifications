const express = require("express");
const router = express.Router();
const { user_register, user_login } = require("../controllers/users");
const { user_notification,get_user_all_notifications,get_user_notifications,update_user_notifications } = require("../controllers/notifications");
const checkAuth = require('../middleware/auth')


router.post("/register", user_register);
router.post("/login", user_login);
router.post("/notifications", checkAuth, user_notification);
router.get("/notifications", checkAuth, get_user_all_notifications);
router.get("/notifications/:id", checkAuth, get_user_notifications);
router.put("/notifications/:id", checkAuth, update_user_notifications);


module.exports = router;