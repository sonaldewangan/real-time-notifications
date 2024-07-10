const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const userSchema = new Schema({
    id: { type: String, required: true, },
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    connected: { type: Boolean, unique: false },
})


userSchema.pre('save', function (next) {
    const user = this;
    console.log("user", user)

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash
            next()
        })
    })

})

const RegisterUser = mongoose.model("RegisterUser", userSchema)

module.exports = RegisterUser;