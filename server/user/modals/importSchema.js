const mongoose=require('mongoose'),Schema = mongoose.Schema
;


const importSchema= new mongoose.Schema({
    // username:{
    //     type:String,
    //     required:true,
    // },
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
        type:String,
        // required:true,
    },
    country:{
        type:String,
        // required:true,
    },
    // userId:{
    //     type:Schema.Types.objectId,ref:"User",
    //  
    // },
    date: { type: Date, default: Date.now },
});

const importModal=mongoose.model("import",importSchema);
module.exports=importModal;

