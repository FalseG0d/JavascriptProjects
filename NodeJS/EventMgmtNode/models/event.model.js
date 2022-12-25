const mongoose=require('mongoose');

var eventSchema=new mongoose.Schema({
    eventName:{
        type:String,
        required:"Event Name is required"
    },
    date:{
        type:Date,
        required:"Event Date is required"
    },
    venue:{
        type:String,
        required:"Event Venue is required"
    },
    comments:{
        type:String
    }
});
mongoose.model('Event',eventSchema);