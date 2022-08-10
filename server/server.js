const express = require("express");
const bcrypt = require("bcryptjs");
const checkExistingUser=require("./user/utility")
require("dotenv").config();
const signupModal=require("./user/modals/signup-model")
const server = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors")
//middleware
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors())
server.listen("3003", (err)=> {
    if(!err) {
        console.log("Server started at 3003");
    }
});

mongoose.connect("mongodb://localhost:27017", (data)=> {
    console.log("connected to db")
}, (err)=> {
    
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




