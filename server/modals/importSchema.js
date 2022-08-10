const mongoose=require('mongoose');

const importSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    industry:{
        type:String,
        required:true,
    },
    phone_number:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    _id:{
        type:Schema.Types.objectId,ref:"",
        date:Date,
    },
    date: { type: Date, default: Date.now },
});

const importModal=mongoose.model("import",importSchema);
module.exports=importModal;

