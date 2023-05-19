const  validateEmail=(req, res, next)=>{
    const { email } = req.body;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send('Invalid email');
    }
  
    next();
  }

  module.exports={
    validateEmail
  }