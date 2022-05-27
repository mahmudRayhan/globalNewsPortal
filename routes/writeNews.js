const writenewsRouter = require('express').Router();
const bodyParser = require('body-parser');
//const news = require('../models/NewsModel')
const news = require('../models/TempNewsModel')
const NewsModel = require('../models/NewsModel')
const UserModel = require('../models/SignUpModel')

writenewsRouter.use(bodyParser.json());

const multer = require('multer');
const path = require('path');

const storage2 = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./globalNews/public/assets/tempNews")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload2 = multer ({storage:storage2});



writenewsRouter.post('/tempUpload',upload2.single("headerPic"),(req, res) => {
    // news.create(req.body)

    console.log("temp photo")

    console.log(req.file.originalname)
    
    
})

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./globalNews/public/assets/writeNews")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload = multer ({storage:storage});


writenewsRouter.post('/',upload.single("headerPic"),(req, res) => {
    // news.create(req.body)

    console.log(req.body.category)
    const newsDemo = new news({
        // headerPic: req.file.originalname,
        title: req.body.title,
        subheader: req.body.subheader,
        body: req.body.body,
        category:req.body.category,
        tag:req.body.tag,
        
        reporterID:req.body.reporterID,
        headerImage:req.file.originalname,
        thumbnail:req.body.thumbnail
        
    }) 
    
    const fs = require('fs')

    const path = './globalNews/public/assets/tempNews/'+req.file.originalname;

    try {
    fs.unlinkSync(path)
    //file removed
    } catch(err) {
    console.error(err)
    }

    console.log(newsDemo)
    newsDemo.save().then(
        (data)=>{
            UserModel.findOne({_id:req.body.reporterID})
                .then(user=>{
                    if(user.userRole === 'editor'){
                        let newsObj =new NewsModel({
                            title:data.title,
                            tag:data.tag,
                            body:data.body,
                            category:data.category,
                            subheader:data.subheader,
                            headerImage:data.headerImage,
                            thumbnail:data.thumbnail,
                            reporterID:data.reporterID,
                        })
                        newsObj.save().then(response=>{
                            
                            news.deleteOne({_id:data._id})
                                .then(result=>{
                                    res.send('Successfully added to database')
                                    console.log("Done");
                                }).catch(err=>{
                                    console.log(err);
                                })
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                    else if(user.userRole === 'sub-editor'){
                        news.findOneAndUpdate({_id:data._id},{category:"opinion"})
                                        .then(obj=>console.log(obj))
                    }
                    else{
                    console.log("update")
                    console.log(user.userRole)
                    res.json(data)
                    }
                    
                })

            
        }
    ).catch( 
        (error)=>{
            console.log(error)
            res.json(error)
        }
    ) 
})

writenewsRouter.post('/edit/:id',(req,res)=>{
    console.log("Request Body");
    console.log(req.body);
    news.findById(req.params.id)
    .then((nw)=> {
        //console.log(nw);
        //console.log("Updating news Id", req.params.id);
        
        nw.title = req.body.title,
        nw.subheader = req.body.subheader,
        nw.body = req.body.body,
        nw.category = req.body.category,
        nw.tag = req.body.tag,
        
        nw.reporterID = req.body.reporterID,
        
        //console.log(nw);

        nw.save().then(
            (data)=>{
                console.log("update")
                console.log(data)
                res.json(data)
            }
        ).catch(err => {
            console.log(error)
            res.json(error)
        })
    }).catch( 
        (error)=>{
            res.json(error)
        })
})

writenewsRouter.route('/edit/:id')
.get((req,res,next) => {
    /*leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));*/
})

.put((req, res, next) => {
    console.log("Request Body");
    console.log(req.body);
    news.findById(req.params.id)
    .then((nw)=> {
        console.log(nw);
        console.log("Updating news Id", req.params.id);
        
        nw.title = req.body.title,
        nw.subheader = req.body.subheader,
        nw.body = req.body.body,
        nw.category = req.body.category,
        nw.tag = req.body.tag,
        
        nw.reporterID = req.body.reporterID,

        console.log(nw);

        nw.save().then(
            (data)=>{
                console.log("update")
                console.log(data)
                res.json(data)
            }
        ).catch(err => {
            console.log(err)
            res.json(err)
        })
    }).catch( 
        (error)=>{
            res.json(error)
        })
})
.delete((req, res, next) => {   
});



module.exports = writenewsRouter;