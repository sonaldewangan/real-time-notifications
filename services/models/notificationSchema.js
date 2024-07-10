const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    id: { type: String, required: true, },
    userId: { type: String, required: true, unique: false },
    message: { type: String, required: true, unique: false },
    read: { type: Boolean, unique: false},
})

const CreateNotification = mongoose.model("CreateNotification", notificationSchema)

module.exports = CreateNotification;