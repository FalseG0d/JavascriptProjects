const mongoose=require("mongoose");
require("dotenv").config();
const mongoDBErrors=require("mongoose-mongodb-errors");

mongoose.Promise=global.Promise;

//Mongoose Errors Handler
mongoose.plugin(mongoDBErrors);

mongoose.connect(process.env.MONGOURI).then(() => {
    console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });;