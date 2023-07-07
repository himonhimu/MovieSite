const  mongoose  = require("mongoose");

const AdminUserSchema = mongoose.Schema({
    
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
    default:1
},
name:{
    type:String,
    required:true
},

createdOn:{
    type:Date,
    default:Date.now
} 

})

module.exports = mongoose.model('admin_user', AdminUserSchema)