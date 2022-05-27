const express = require('express')
const router = express.Router();
const NewsModel = require('../models/NewsModel')
const ApiNewsModel = require('../models/ApiNewsModel')
const Promise = require('bluebird')
router.get('/home',(req,res)=>{

    Promise.props({
        bbcnews : ApiNewsModel.find({category:'bbc'}).limit(8),
        cnnnews : ApiNewsModel.find({category:'cnn'}).limit(8),
        sportsnews:NewsModel.find({category:'sports'}).sort({date: 'desc'}).limit(4),
        worldnews:NewsModel.find({category:'international'}).sort({date: 'desc'}).limit(4),
        technews:NewsModel.find({category:'technology'}).sort({date: 'desc'}).limit(4),
        mainnews:NewsModel.find({section:'main'}).sort({date: 'desc'}).limit(4),
        topnews:NewsModel.findOne({section:'top'}).sort({date: 'desc'}),
        sidenews:NewsModel.find({section:'side'}).sort({date: 'desc'}).limit(4),
        nationalnews:NewsModel.find({category:'national'}).sort({date: 'desc'}).limit(4),
        opinions:NewsModel.find({category:'opinion'}).sort({date: 'desc'}).limit(4)
    }).then(result=>{
    
        res.send(result)
    
    }).catch(err=>{
        console.error("Something went wrong",err);
    })
    

    //res.send(result)
    
})

module.exports = router