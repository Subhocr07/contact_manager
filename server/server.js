const express=require("express");
const mongoose=require('mongoose');
const app=express();
const jwt=require("jsonwebtoken");
require('dotenv').config();
// const cors = require("cors");
const  {MONGOURI}=require("./keys");

const importController=require("./routes/import");



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