const {Router} =require('express');
const userRouter=Router();
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {UserModel}=require('./../model/user.model')
const {validateEmail}=require('./../controller/middleware/validateEmail');

userRouter.post('/login', validateEmail,async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({email});

    if (!user) {
      return res.status(401).send({error:'Invalid email'});
    }

    const hash = user.password;
    bcrypt.compare(password, hash, function (error, result) {
      if (error) {
        console.error(error);
        return res.status(500).send({error:'Internal Server Error'});
      }

      if (result) {
        
        const token = jwt.sign({ email: user._id }, process.env.SECRET_KEY, { expiresIn: '10s' });
        return res.status(200).send({message:"login successful", token: token, fname:user.fname,lname:user.lname,email:user.email});
      } else {
        return res.status(401).send({error:'Invalid password'});
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({error:'Login Failed: Internal Server Error'});
  }
});

userRouter.post('/register',validateEmail,async(req,res)=>{
    try {
    const {fname,lname,email,password}=req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).send("BadRequest");
      }
      const user = await UserModel.findOne({email});
  
      if (user) {
        return res.status(500).send({error:"user already registered"} );
      }
    bcrypt.hash(password,5,async function(error,hash) {
        if(error){
            res.status(500).send({error:`Registeration Fail- Internal Server Error`});
            console.log(error);
        }
       const user=new UserModel({
        fname,lname,email,password:hash
       })
       await user.save();
       bcrypt.compare(password, hash, function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).send({error:'Registeration Fail- Internal Server Error'});
        }
  
        if (result) {
          
          const token = jwt.sign({ email: user._id }, process.env.SECRET_KEY, { expiresIn: '10s' });
          return res.status(200).send({message:"login successful", token: token, fname:user.fname,lname:user.lname,email:user.email});
        } else {
          return res.status(401).send({error:'Invalid password'});
        }
      });
    })}  catch (error) {
     res.status(500).send({ error: `Registeration Fail- Internal Server Error` });

    }
})

module.exports={
    userRouter
}