const express = require('express')
const router = express.Router();
const NewsModel = require('../models/NewsModel')
const TempNewsModel = require('../models/TempNewsModel')
const User = require('../models/SignUpModel')
const ObjectID = require('mongodb').ObjectID;

router.get('/news/:newsid',(req,res)=>{
    //let objectId =  ObjectID(req.params.newsid);
    console.log(req.params.newsid);
    console.log("while searching for news1");
    let recommendedNews = null;


/*
    NewsModel.find({_id:req.params.newsid})
            .then(docs=>{
                console.log(docs);

            }).catch(err=>{
                console.log("Not Found 1 !")
            })

*/


       /* NewsModel.find({_id:req.params.newsid})
        .then(docs=>{
            console.log("part 1");
            console.log(docs);
            
            

            
        }).catch(err=>{
            console.log("Not Found 2!")
            
        })

        */























    NewsModel.findOne({_id:req.params.newsid})
            .then(docs=>{
                console.log(docs);
                NewsModel.find({
                    $and:[
                        {category:docs.category},
                        {_id:{$ne:docs._id}}
                    ]
                }).sort({views: 'desc'}).limit(3).then(
                    recomNews=>{
                        User.findOne({_id:docs.reporterID})
                        .then(user=>{
                            docs ={
                                ...docs._doc,
                                authorName:user.fullName,
                                authorImage:user.profilePic,
                                authorDesk:user.userDesk,
                                authorRole:user.userRole,
                                recommendedNews:recomNews
                                }
                            console.log(docs);
                            res.send(docs);
                            
                        })

                    }
                )
                

                
            }).catch(err=>{
                console.log("Not Found!")
                res.send(err)
            })
 })

 router.delete('/news/:newsid',(req,res) => {
    console.log(req.params.newsid);

    NewsModel.findByIdAndDelete({_id : req.params.newsid})
    .then(docs => {
        console.log("Deleted");
        res.send(docs);
    })
    .catch(err => {
        res.send(err);
    })
 })


 router.get('/temp/:newsid',(req,res)=>{
    //let objectId =  ObjectID(req.params.newsid);
    console.log(req.params.newsid);
    console.log("while searching for news2");
    
    TempNewsModel.findOne({_id:req.params.newsid})
            .then(docs=>{
                
                User.findOne({_id:docs.reporterID})
                    .then(user=>{
                        docs ={
                            ...docs._doc,
                            authorName:user.fullName + " " + user.lastName,
                            authorImage:user.profilePic,
                            authorDesk:user.userDesk,
                            authorRole:user.userRole
                            }
                            console.log(docs);
                        res.send(docs)
                    })
                
            }).catch(err=>{
                res.send(err)
            })
 })
module.exports = router