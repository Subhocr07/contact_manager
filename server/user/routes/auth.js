const jwt=require("jsonwebtoken");
const signupModal = require("../modals/signup-model");

const auth=async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
        const verifyuser=jwt.verify(token,process.env.SECRET_KEY);
        const user=await signupModal.findOne({_id:verifyuser._id})
    } catch (err) {
        
    }
    next()
}

module.exports=auth;