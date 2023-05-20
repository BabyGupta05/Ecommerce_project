const {Router} =require('express');
const userRouter=Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {UserModel}=require('./../model/user.model')
const {validateEmail}=require('./../controller/middleware/validateEmail');
const { loginMiddleware }=require('./../controller/middleware/loginMiddlware')
userRouter.post('/login', validateEmail,loginMiddleware,(req, res) => {
  const { token } = req;
  return res.status(200).send({ message: "login successful", token: token });
  const { email, password } = req.body;

});

userRouter.post('/register',validateEmail,async(req,res)=>{
    try {
    const {fname,lname,email,password}=req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).send("BadRequest");
      }
      const user = await UserModel.findOne({email});
  
      if (user) {
        return res.redirect('/user/login')
      }
    bcrypt.hash(password,5,async function(error,hash) {
        if(error){
            res.status(500).send(`register:Internal Server Error${error}`);
            console.log(error);
        }
       const user=new UserModel({
        fname,lname,email,password:hash
       })
       await user.save();
       res.send("register successful");
    })}  catch (error) {
     res.status(500).send({ error: `Internal Server Error ${error}` });

    }
})

module.exports={
    userRouter
}