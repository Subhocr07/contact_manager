const mongoose=require('mongoose'),Schema = mongoose.Schema;
// const User=require("./signup-model");


const importSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    designation:{
        type:String,
        // required:true,
    },
    company:{
        type:String,
        // required:true,
    },
    industry:{
        type:String,
        // required:true,
    },
    phone_number:{
        type:Number,
        // required:true,
    },
    country:{
        type:String,
        // required:true,
    },
    importedById:{
        type: Schema.Types.ObjectId,
        ref: "Usersignup"
      
    },
    date: { type: Date, default: Date.now },
});

const importModal=mongoose.model("Import",importSchema);
module.exports=importModal;

