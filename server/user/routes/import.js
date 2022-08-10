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
            username:req.body.username,
            userId:req.body.userId,
            name:req.body.name,
            designation:req.body.designation,
            company:req.body.company,
            industry:req.body.industry,
            email:req.body.email,
            phone_number:req.body.phone_number,
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

router.delete("/delete/:id",(req,res)=>{
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