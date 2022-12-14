const express= require('express');
const bp =require("body-parser")
var cors = require('cors');
require('dotenv').config()

const PORT=8000;
const app= express();

app.use(cors())  //this configurationm for the pre-filigh request
app.use(bp.json());

const posts={};

app.get("/posts",(req,res)=>{
 res.send(posts);
});

app.post("/events", (req,res)=>{
    const {type,data}=req.body;
    if(type==='PostCreated'){
        const {id,title} =data;
        posts[id]={id,title,comments:[]};
    }
    if(type === 'CommentCreated'){
        const {id,content,postId,status} =data;
        const post=posts[postId];
        post.comments.push({id,content,status});
    }

    if(type === 'CommentUpdated'){
        const {id,content,postId,status} =data;
        const post=posts[postId];
        const comment=post.comments.find(c=>c.id===id);
        comment.status=status;
    }
   res.status(200).send({status:'ok'});
});

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
});