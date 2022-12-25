const mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:"Username is required"
    },
    password:{
        type:String,
        required:"Password is required"
    },
    email:{
        type:String,
        required:"Email is required"
    }
});
mongoose.model('User',userSchema);