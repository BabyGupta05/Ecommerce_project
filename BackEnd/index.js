const express=require('express');
const {userRouter}=require('./routes/user.routes');
var cors = require('cors')
const port=8080;
const connectDB = require('./connection');

connectDB();
const app=express();
// json parser
app.use(express.json())

// allow all origin
 
app.use(cors())
app.get('/',(req,res)=>{
    res.send("home page");
})
app.use('/user',userRouter);


app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
