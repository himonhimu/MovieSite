const  mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    
name:{
    type:String,
    required:true
},
age:{
    type:Number,
    required:true
},
address:{},
createdOn:{
    type:Date,
    default:Date.now
} 

})

module.exports = mongoose.model('admin_user', userSchema)