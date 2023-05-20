const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('./../../model/user.model');
const loginMiddleware=async(req,res,next)=>{
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
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
        req.token=token;
        next();
      } else {
        return res.status(401).send('Invalid password');
      }
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
module.exports={
    loginMiddleware
}