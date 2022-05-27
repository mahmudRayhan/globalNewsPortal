const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    commentBody:  {
        type: String,
        required: true
    },
    commentAuthor :  {
        type: String,
        required: true,
    }
    });

const TempNewsSchema = new mongoose.Schema({
    
    title:{
        type:String,
        required: true
    },
    subheader:{
        type:String,
        required:false
    },
    body:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true,
        lowercase:true
    },
    tag:{
        type:String,
        required: false
    },
    date:{
        type:Date,
        default: new Date()
    },
    headerImage:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:[String]
    },
    reporterID : {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'user',
        type : String,
        required : true,
    },status:{
        type:String,
        default:"pending"
    },comments : [commentSchema],
    section:{
        type:String,
        default:""
    },approvedBy:{
        type: mongoose.Schema.Types.ObjectId,
        require:false
    }
});

const TempNewsModel = mongoose.model('TempNewsModel',TempNewsSchema)
module.exports = TempNewsModel

