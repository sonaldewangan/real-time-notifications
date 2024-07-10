const CreateNotification = require('../models/notificationSchema')
const { v4: uuidv4 } = require('uuid');
const io = require("../../socket")

const user_notification = async (req, res) => {

    var responseData = {};

    try {

        const uniqueId = uuidv4();
        var jsonData = {};
        jsonData["id"] = uniqueId;
        jsonData["userId"] = req.body.userId;
        jsonData["message"] = req.body.message;
        jsonData["read"] = req.body.read;

        const newNotification = new CreateNotification(jsonData)

        const createNotification = await newNotification.save();

        io.emit('new_notification', jsonData);

        console.log("Create", createNotification)
        responseData["error"] = false;
        responseData["message"] = createNotification.message;
        responseData["code"] = 200;

        res.send(responseData)
    }
    catch (err) {
        responseData["error"] = true;
        responseData["message"] = "";
        responseData["code"] = 500;
        res.send(responseData)
    }



}

const get_user_all_notifications = async (req, res) => {

    var responseData = {};

    try {
        const notificationsData = await CreateNotification.find();

        responseData["error"] = false;
        responseData["notifications"] = notificationsData;
        responseData["code"] = 200
        res.send(responseData);
    } catch (err) {
        responseData["error"] = true;
        responseData["message"] = "";
        responseData["code"] = 500;
    }


}

const get_user_notifications = async (req, res) => {

    var responseData = {};

    try {
        const userId = req.params.id

        const notificationsData = await CreateNotification.findOne({ id: userId });
        responseData["error"] = false;
        responseData["notifications"] = notificationsData;
        responseData["code"] = 200
        res.send(responseData);
    } catch (err) {
        responseData["error"] = true;
        responseData["message"] = "";
        responseData["code"] = 500;
    }


}

const update_user_notifications = async (req, res) => {

    var responseData = {};

    try {
        const userId = req.params.id
        let updateReadMsg;

        const users = await CreateNotification.findOne({ id: userId });
        console.log("users", users)
        if (users.read === false) {
            updateReadMsg = true
        }


        const UpdatedMessage = await CreateNotification.findOneAndUpdate({ id: userId }, { $set: { read: updateReadMsg } }, { new: true });

        responseData["error"] = false;
        responseData["notifications"] = UpdatedMessage;
        responseData["code"] = 200
        res.send(responseData);
    } catch (err) {
        responseData["error"] = true;
        responseData["message"] = "";
        responseData["code"] = 500;
    }

}


module.exports.user_notification = user_notification;
module.exports.get_user_all_notifications = get_user_all_notifications;
module.exports.get_user_notifications = get_user_notifications;
module.exports.update_user_notifications = update_user_notifications;