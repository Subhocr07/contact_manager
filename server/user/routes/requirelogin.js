const jwt=require("jsonwebtoken");
const mongoose=require ('mongoose');
const Usersignup=require("../modals/signup-model");



module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const authToken=authorization.replace("Bearer","");
    jwt.verify(authToken,process.env.SECRET_KEY,(err,payload)=>{
        if(err){
          return  res.status(401).json({error:"authToken is Invalid"})
        }
        const {_id}=payload
        console.log(_id)
        Usersignup.findById(_id).then((userdata)=>{
            req.user=userdata
            console.log(userdata)
            next()
        }).catch((err)=>{
            res.json({err});
        })
    })
}