const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    
 email:{
     type:String,
     required:true,
     trim:true,
     unique:true,
     lowercase:true
 },
 password:{
     type:String,
     required:true,
     trim:true,
     minlength:6,
     validate(value){
         let a=value.toLowerCase();
         if(a.includes('password'))
         {
             throw new Error('Your Password contains the word "password" ');
         }
     }
 }
 

});

userSchema.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign({_id: user._id.toString()},"secret",{  expiresIn:'1d' });
    await user.save();
    return token;
}

userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password'))
    {
        user.password= await bcrypt.hash(user.password,8);
    }
    next();
})
const User=mongoose.model('User',userSchema);
module.exports=User;
