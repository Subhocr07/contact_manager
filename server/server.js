const express = require("express")
const mongoose =require("mongoose")
const userController = require("./user/routes/user");
const app = express()
const jwt = requireI("jsonwebtoken")
require("dotenv").config();
const cors = require("cors");
app.listen(3001, (err)=>{
    if(!err){
        console.log("server started at port 3001");
    }else{
        console.log(err);
    }
});
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect("mongodb+srv://sougata:project%40123@contactmanager.utz7mbi.mongodb.net/test",(data)=>{
    console.log("successfully connected to db")
},(err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.send("Ecommerce Backend")
})
app.use("/user",userController)