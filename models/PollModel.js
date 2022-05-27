const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    
    title:{
        type:String,
        require:true
    },options:{
        type:[String],
        default:["Yes","No","No opnion"]
    },date:{
        type:Date,
        default:new Date()
    },votes:{
        type:[Number],
        default:[0,0,0]
    },type:{
        type:String,
        default:"regular"
    },deadline:{
        type:Date,
        require:true
    },voterID:{
        type:[String],
        default:[]
    }
});

const PollModel = mongoose.model('PollModel',PollSchema)
module.exports = PollModel

