const express = require('express')
const router = express.Router();
const TempNewsModel = require('../models/TempNewsModel')
const NewsModel = require('../models/NewsModel')

router.get('/tempNews',(req,res)=>{
    console.log(req.query)

    if(req.query.userRole === "sub-editor"){
        console.log(req.query.userDesk);
        TempNewsModel.find({category:req.query.userDesk}).sort({date:"desc"})
        .then(docs=>{
            console.log(docs);
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
    }
    else if(req.query.userRole === "reporter"){
        console.log(req.query)
        TempNewsModel.find({reporterID:req.query.userID})
        
        .then(docs=>{
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
    }
    else if(req.query.userRole === "editor"){
        console.log(req.query)
        TempNewsModel.find({category:"opinion"})
        
        .then(docs=>{
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
    }
    else{
        res.status(401).send();
    }

})


router.get('/news',(req,res)=>{
    console.log(req.query)

    if(req.query.userRole === "sub-editor"){
        console.log(req.query.userDesk);
        NewsModel.find({reporterID:req.query.userID}).sort({date:"desc"})
        .then(docs=>{
            console.log(docs);
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
    }
    else if(req.query.userRole === "reporter"){
        console.log(req.query)
        NewsModel.find({reporterID:req.query.userID})
        
        .then(docs=>{
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
    }
    else if(req.query.userRole === "editor"){
        console.log(req.query)
        NewsModel.find({category:"opinion"})
        
        .then(docs=>{
            res.send(docs)
        }).catch(err=>{
            res.send(err)
        })
    }
    else{
        res.status(401).send();
    }

})

module.exports = router