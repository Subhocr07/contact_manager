const express=require('express');
const importModal=require("../modals/importSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth=require('./auth');

const router=express.Router();

//post import file to DB
router.post("/add",(req,res)=>{
    console.log(req.headers.authorization,req.body);
    try{
        // const verified=jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
        importModal.create({
            // userId:req.user._id,
            name:req.body.Name,
            designation:req.body.Designation,
            company:req.body.Company,
            industry:req.body.Industry,
            email:req.body.Email,
            phone_number:req.body.Phone_number,
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

router.delete("/delete/:id",auth,(req,res)=>{
    /*console.log(req.params)*/
        importModal.deleteOne({userId:req.params.id}).then((data)=>{
            // console.log(data)
            if(data.deletedCount===0){
                res.status(400).send(`userId is not available`)
            }else{ 
                res.status(200).send("Successfully deleted ")
            }
           
        }).catch((err)=>{
            res.status(400).send(err)
        })
})

module.exports=router;