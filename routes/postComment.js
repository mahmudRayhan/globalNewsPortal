const postCommentRouter = require('express').Router();
const bodyParser = require('body-parser');
const news = require('../models/NewsModel')
const tempNews = require('../models/TempNewsModel')

postCommentRouter.use(bodyParser.json());

postCommentRouter.route('/news/:newsId')
.get((req,res,next) => {
    /*leaders.find({})
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));*/
})
.post((req, res, next) => {
    console.log("NewsId",req.params.newsId);
    console.log(req.body);
    news.findById(req.params.newsId)
    .then((news) => {
        if (news != null) {
            news.comments.push(req.body);
            news.save()
            .then((news) => {
                console.log(news.comments);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);                
            }, (err) => next(err));
        }
        else {
            err = new Error('News ' + req.params.newsId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


postCommentRouter.route('/tempNews/:newsId')
.get((req,res,next) => {
    console.log("tempNewsId",req.params.newsId);
    tempNews.findById(req.params.newsId)
    .then((tn) => {
        if(tn!=null)
        {
            console.log(tn.comments);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tn.comments);
        }
        else
        {
            console.log("Id not found");
            err = new Error('tempNews ' + req.params.newsId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    console.log("tempNewsId",req.params.newsId);
    console.log(req.body);
    tempNews.findById(req.params.newsId)
    .then((news) => {
        if (news != null) {
            news.comments.push(req.body);
            news.save()
            .then((news) => {
                console.log(news.comments);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(news);                
            }, (err) => next(err));
        }
        else {
            err = new Error('tempNews ' + req.params.newsId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


module.exports = postCommentRouter;