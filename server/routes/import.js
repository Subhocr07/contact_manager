const express=require('express');
const importModal=require("../modals/importSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router=express.Router();

//post import file to DB
router.post("/add",(req,res)=>{
    // console.log(req.headers.authorization,req.body);
    try{
        // const verified=jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
        importModal.create({
            // username:verified,
            _id:req.body.userId,
            name:req.body.name,
            designation:req.body.designation,
            company:req.body.company,
            industry:req.body.industry,
            email:req.body.email,
            phone_number:req.body.number,
            country:req.body.country,
        }).then(()=>{
            res.status(200).send("imported successfully")
        }).catch((err)=>{
            res.status(400).send(err)
        })
    }catch(err){
       res.status(400).send("user not authorized");
    }
});

router.get("/delete/:id",(req,res)=>{
        importModal.deleteOne({})
})

module.exports=router;