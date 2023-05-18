const {Router} =require('express');
const userRouter=Router();

userRouter.post('/login',(req,res)=>{
    res.send("login");
})

userRouter.post('/register',(req,res)=>{
    res.send("register");
})

module.exports={
    userRouter
}