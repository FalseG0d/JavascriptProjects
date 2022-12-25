const router=require("express").Router();
const mongoose=require("mongoose");


const Post=mongoose.model("Post");
const Comment=mongoose.model("Comment")

//Dummy comment get request

router.get("/post/:postId",async(req,res)=>{
    const post=await Post.findById({_id:req.params.postId});
    var comment=[];
    for(id of post.comments){
    comment.push(await Comment.findOne({_id:id}));                    
    }
    res.send(comment);
})

//Dummy comment put

router.put("/post/:commentId",async(req,res)=>{
    
    const comment=await Comment.findByIdAndUpdate({
        _id:req.params.commentId
    },req.body,{
        new:true, // If new:true in addidtional information then
        runValidater:true
    })       
    res.send(comment)//the post object sent here is updated otherwise it is the original one but updates are made regardless  

})
//Dummy comment request

router.post("/post/:postId",async(req,res)=>{
        const post=await Post.findOne({_id:req.params.postId});
        const comment=new Comment();
        comment.content=req.body.content;
        comment.post=post._id;
        await comment.save();
        post.comments.push(comment._id);
        await post.save();
        res.send(comment);
    
})

//Dummy Delete

router.delete("/post/:postId/:commentId",async(req,res)=>{
    const comment=await Comment.findByIdAndRemove({_id:req.params.commentId});
    const post=await Post.findById({_id:req.params.postId});
    post.comments.remove(req.params.commentId);
    await post.save();
    res.send(comment);
})



module.exports=router;