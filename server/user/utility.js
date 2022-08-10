const signupModal=require("./modals/signup-model")
const checkExistingUser = async (email)=>{
    let existingUser = false;
    await signupModal.find({email: email}).then((userData)=>{
        if(userData.length){
            existingUser=true;
        }
    })
    return existingUser
}
module.exports =checkExistingUser