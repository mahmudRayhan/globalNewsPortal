const express = require('express')
const router = express.Router();
const NewsModel = require('../models/NewsModel')
const TempNewsModel = require('../models/TempNewsModel')
const Promise = require('bluebird')


router.post('/approve',(req,res)=>{
    console.log(req.body.news.section);
    console.log(req.body);
    if(req.body.news.section === undefined || req.body.news.section === ""){
        let news =new NewsModel({
            title:req.body.news.title,
            tag:req.body.news.tag,
            images:req.body.news.images,
            body:req.body.news.body,
            category:req.body.news.category,
            headerImage:req.body.news.headerImage,
            thumbnail:req.body.news.thumbnail,
            reporterID:req.body.news.reporterID,
            approvedBy:req.body.approvedBy
        })
        news.save().then(response=>{
            
            TempNewsModel.deleteOne({_id:req.body.news._id})
                .then(result=>{
                    res.send('Successfully added to database')
                }).catch(err=>{
                    console.log(err);
                })
        }).catch(err=>{
            console.log(err);
        })
       
    }
    else{
        TempNewsModel.findOne({_id:req.body.news._id})
            .then(doc=>{
                doc.section = req.body.news.section
                doc.approvedBy = req.body.approvedBy
                doc.save()
                res.status('200').send()
            })
    }

})

router.post('/reject',(req,res)=>{

    TempNewsModel.deleteOne({_id:req.body.id})
    .then(result=>{
        res.send('Successfully deleted')
    }).catch(err=>{
        console.log(err);
    })
})
router.post('/refer',(req,res)=>{
    console.log("Refer:",req.body)
    TempNewsModel.findOneAndUpdate({_id:req.body.id},{status:"refered to editor"})
        .then(response=>{
            res.send("Successfully refered")
        }).catch(err=>{
            console.log(err)
        })
})

router.get('/requests',(req,res)=>{
    console.log("requests")
    Promise.props({
        mainnews:TempNewsModel.find({section:'main'}).sort({date: 'desc'}),
        topnews:TempNewsModel.find({section:'top'}).sort({date: 'desc'}),
        sidenews:TempNewsModel.find({section:'side'}).sort({date: 'desc'})
    }).then(result=>{
    
        res.send(result)
    
    }).catch(err=>{
        console.error("Something went wrong",err);
    })
})
router.post('/reqapprove',(req,res)=>{
    console.log(req.body.news);

    TempNewsModel.findOne({_id:req.body.news._id})
        .then(doc=>{
            
            let news =new NewsModel({
                title:req.body.news.title,
                tag:req.body.news.tag,
                images:req.body.news.images,
                body:req.body.news.body,
                category:req.body.news.category,
                headerImage:req.body.news.headerImage,
                thumbnail:req.body.news.thumbnail,
                reporterID:req.body.news.reporterID,
                approvedBy:req.body.approvedBy,
                section:req.body.news.section
            })
            news.save().then(response=>{
                
                TempNewsModel.deleteOne({_id:req.body.news._id})
                    .then(result=>{
                        res.status('200').send('Successfully added to database')
                    }).catch(err=>{
                        console.log(err);
                    })
            }).catch(err=>{
                console.log(err);
            })
           
        })
})

module.exports = router