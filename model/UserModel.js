const  mongoose  = require("mongoose");

const UserSchema = mongoose.Schema({
    
user_name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:Number,
    default:2
},
name:{
    type:String,
    required:true
},
dob:{
    type:String,
},
email:{
    type:String,
},
createdOn:{
    type:Date,
    default:Date.now
} 

})

module.exports = mongoose.model('user', UserSchema)