const {Router} =require('express');
const userRouter=Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {UserModel}=require('./../model/user.model')
const {validateEmail}=require('./../controller/middleware/validateEmail')
userRouter.post('/register',validateEmail,(req,res)=>{
    try {
    const {fname,lname,email,password}=req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).send('Missing required fields');
      }
    bcrypt.hash(password,5,async function(error,hash) {
        if(error){
            res.status(500).send('Internal Server Error');
            console.log(error);
        }
       const user=new UserModel({
        fname,lname,email,password:hash
       })
       await user.save();
       res.send("register successful");
    })}  catch (error) {
     res.status(500).send({ error: 'Internal Server Error' });

    }
})
userRouter.post('/login', validateEmail, async(req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserModel.findOne({email});
  
      if (!user) {
        return res.status(401).send('Invalid email');
      }
  
      const hash = user.password;
      bcrypt.compare(password, hash, function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).send('Internal Server Error');
        }
  
        if (result) {
          return res.status(200).send('Login successful');
          const token = jwt.sign({ email: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
          return res.status(200).send({message:"login successful"},{ token: token });
        } else {
          return res.status(401).send('Invalid password');
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports={
    userRouter
}