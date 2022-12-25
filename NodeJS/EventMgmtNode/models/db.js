const mongoose=require('mongoose');

require("dotenv").config();

mongoose.connect(process.env.MONGOURI).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });;

require('./user.model')
require('./event.model');