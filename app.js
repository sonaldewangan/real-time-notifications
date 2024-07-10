const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require('mongoose')
const usersRoutes = require('./services/routes/routes.js')


app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", usersRoutes);

const mongoURI = 'mongodb://127.0.0.1:27017/user';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.listen(4000, (() => {
    console.log(`app is listening in 4000`)
}))