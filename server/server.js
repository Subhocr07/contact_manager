
const express=require("express");
const mongoose=require('mongoose');
const app=express();
const server = express();
const jwt=require("jsonwebtoken");
require('dotenv').config();
// const cors = require("cors");
const  {MONGOURI}=require("./keys");

const importController=require("./user/routes/import");
const checkExistingUser=require("./user/utility")
const signupModal=require("./user/modals/signup-model")



//server listen
const PORT=3001;

app.listen(PORT,(err)=>{
    if(!err) {
        console.log(`app started at port ${PORT}`)
    }else{
        console.log(err)
    }
    
})

//body parser

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(multer.array());

//database connection

mongoose.connect(MONGOURI,(err)=>{
    if(!err) {
        console.log(`server connected at ${MONGOURI}`)
    }else{
        console.log(err)
    }
});

//get route

app.get("/",(req,res)=>{
    res.send("contact manager app started")
})

app.use("/import",importController);

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

