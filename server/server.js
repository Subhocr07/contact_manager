
const express=require("express");
const mongoose=require('mongoose');
const server = express();
const jwt=require("jsonwebtoken");
require('dotenv').config();
const bcrypt = require("bcryptjs")
const cors = require("cors");

const importController=require("./user/routes/import");
const checkExistingUser=require("./user/utility")
const signupModal=require("./user/modals/signup-model")



//server listen
const PORT=3001;

server.listen(PORT,(err)=>{
    if(!err) {
        console.log(`app started at port ${PORT}`)
    }else{
        console.log(err)
    }
    
})

//body parser

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors())
//database connection

mongoose.connect("mongodb+srv://sougata:project%40123@contactmanager.utz7mbi.mongodb.net/test",(err)=>{
    if(!err) {
        console.log(`server connected at db`)
    }else{
        console.log(err)
    }
});

//get route

server.get("/",(req,res)=>{
    res.send("contact manager app started")
})



const salt = 10;
server.post("/signup", async (req,res)=> {
    if(await checkExistingUser(req.body.email)){
        res.status(400).send("username  exit. please try with different username")
    }else{
    bcrypt.genSalt(salt, (err,hashSalt)=> {
        bcrypt.hash(req.body.password, hashSalt, (err, passwordHash)=> {
            signupModal.create({email: req.body.email, password: passwordHash}).then(()=> {
                res.status(200).send(`${req.body.email} added successfully`);
            }).catch((err)=> {
                res.status(400).send(err);
            })
        })
    })
}
});
server.post("/login", (req, res)=> {
    signupModal.find({email: req.body.email}).then((user)=> {
        if(user.length) {
            bcrypt.compare(req.body.password, user[0].password).then((match)=> {
                if(match) {
                   
                    const authToken = jwt.sign(req.body.email, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    res.status(400).send("Invalid password")
                }
            });
        } else {
            res.status(400).send("User Not Exist")
        }
    })
});
server.use("/import",importController);

