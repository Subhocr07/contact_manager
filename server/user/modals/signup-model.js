const mongoose = require("mongoose"),Schema = mongoose.Schema

const signupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
        
    },    
    uploadId:[{
        type:Schema.Types.ObjectId, 
        ref:"Import"
    }]
});
const signupModal = mongoose.model("Usersignup", signupSchema);
module.exports = signupModal;