const express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const User=mongoose.model('User');

const Event=mongoose.model('Event');

router.get('/',(req,res)=>{
    res.render("login/login");
});

router.get('/register',(req,res)=>{
    res.render("login/register");
});

router.post('/register',async (req,res)=>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const check1=await User.findOne({userName:req.body.userName})
        const check2=await User.findOne({email:req.body.email})
        if((check1==null)&&(check2==null)){
            var user=new User()
            user.userName=req.body.userName;
            user.email=req.body.email;
            user.password=hashedPassword;

            user.save((err,doc)=>{
            if(!err){
                console.log("User Registered");
                res.redirect('/');
            }
            else{
                console.log("Error: "+err);
                res.redirect('/');
            }
        })
        }
        else{
            console.log("User not Registered");
            res.redirect('/');
        }
    } catch (err) {
        console.log("Error: "+err);
        res.redirect('/');
    }
    
})

router.post('/',async (req,res)=>{
    try {
        //const hashedPassword=await bcrypt.hash(req.body.password,10);
        const user=await User.findOne({userName:req.body.userName})
        if((user!=null)&&(bcrypt.compare(req.body.password,user.password))){
            res.redirect('/events/list/');
        }
        else{
            res.redirect('/',{message:"Username or Password doesnot exist"});
        }
        
        
    } catch (err) {
        console.log("Error: "+err);
    }
    
})
module.exports=router;