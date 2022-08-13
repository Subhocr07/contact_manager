const express=require('express');
const importModal=require("../modals/importSchema");
const Usersignup=require("../modals/signup-model");
const requirelogin=require("../routes/requirelogin")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const router=express.Router();

//post import file to DB
router.post("/add", async (req, res) => {
    try {
        const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        const contactList = await Usersignup.find({ userId: auth_id });
        if (contactList.length) {
            // console.log(req.body)

         await Usersignup.updateMany({ userId: auth_id }, { $push: { contact: req.body }})
          // pushing the hole data into the model

            const list = await Usersignup.find({ userId: auth_id });
             // will be getting arr of object [{ ....}]

            let newlist = list[0].contact;
            const newArr = newlist.map((item) => {
                const newObj = Object.assign({}, item, {
                    hiWorld: `${item.name}${item.designation}${item.company}${item.industry}${item.email}${item.phoneNumber}${item.country}`,
                    //converting as string and returning object 
                
                });
                return newObj;
                // objects will be pushed in to array
            });
            var uniqueItems = [];
            var duplicateIds = [];

            newArr.forEach((item) => {
                if (uniqueItems.includes(item.hiWorld)) {
                    duplicateIds.push(item._doc._id);
                    //collecting dup item ids into it and will be used to delete
                } 
                else {
                    uniqueItems.push(item.hiWorld);
                    // uniqueItems.push(item._doc._id);
                }
            });
            let updated = await Usersignup.updateMany({userId:auth_id},{ $pull: { contact: { _id: [...duplicateIds] } } },{multi: true})
            // finally duplicateIds having dup item ids and used to delete all dup item
        }
        else {
           await Usersignup.create({contact: req.body,userId: auth_id});
            const list = await Usersignup.find({ userId: auth_id });
            let newlist = list[0].contact;
            const newArr = newlist.map((item) => {
                const newObj = Object.assign({}, item, {
                    hiWorld: `${item.name}${item.designation}${item.company}${item.industry}${item.email}${item.phoneNumber}${item.country}`,
                });
                return newObj;
            });
            var uniqueItems = [];
            var duplicateIds = [];
            newArr.forEach((item) => {
                if (uniqueItems.includes(item.hiWorld)) {
                    duplicateIds.push(item._doc._id);
                } else {
                    uniqueItems.push(item.hiWorld);
                    uniqueItems.push(item._doc._id);
                }
            });
            let updated = await Usersignup.updateMany({userId:auth_id},{ $pull: { contact: { _id: [...duplicateIds] } } },{multi: true})
        }
        let finalList = await Usersignup.find({ userId: auth_id })
        res.status(200).send(finalList[0].contact)
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
});

//getting the data

router.get('/',(req , res)=>{
    
    try{
        
        const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        
        Usersignup.findOne({userId:auth_id}).then((Data)=>{
          
            res.status(200).send(Data.contact)

        }).catch((err)=>{
            res.status(200).send([])
        })
    }catch(err){
        console.log("Get err")
        res.status(500).send(err.message)
    }
})


//delete user post

router.post("/delete", async (req , res)=>{
    console.log(req.headers.authorization)
    try{

        const auth_id = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
        console.log(auth_id)
        await Usersignup.updateMany({userId:auth_id},{$pull:{contact:{_id:{$in:req.body}}}}, {multi:true}).then(()=>{
            res.status(200).send('Deleted successfully')
        }).catch((err)=>{
            console.log("hello delete 1")
            res.status(500).send(err.message)
        })
    }catch(err){
        console.log("hello delete 2")
        res.status(500).send(err.message)
    }
})

module.exports=router;