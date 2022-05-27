const express = require('express')
const router = express.Router();
const NewsModel = require('../models/NewsModel')
const User = require('../models/SignUpModel')

router.get('/category',(req,res)=>{
    console.log(req.query.category)

    NewsModel.find({category:req.query.category}).sort({date: 'desc'})
            .then(docs=>{
                res.send(docs)
            }).catch(err=>{
                res.send(err)
            })
})

module.exports = router