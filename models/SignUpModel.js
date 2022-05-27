const mongoose = require('mongoose')

const SignUpModel = new mongoose.Schema({
    
    fullName:{
        type:String,
        require: true
    },lastName:{
        type:String,
        require: true
    },profilePic:{
        type:String,
        default:'demoProfilePic.jpeg'
    },email:{
        type:String,
        require: true
    },password:{
        type:String,
        require: true
    },birthday:{
        type:String,
        require: true
    },userRole:{
        type:String,
        lowercase:true,
        default: 'reader'
    },gender:{
        type:String,
        require: true
    },phoneNum:{
        type:String,
        default:''
    },userDesk:{
        type:String,
        default:''
    },date:{
        type:Date,
        default: Date.now
    }
    
});


module.exports = mongoose.model('users',SignUpModel)