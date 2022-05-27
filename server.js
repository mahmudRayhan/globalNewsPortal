
const express = require('express')
const app = express()
const dotenv= require('dotenv')
const mongoose=require('mongoose')
const cors= require('cors')
const CronJob = require('cron').CronJob;
const request = require('request') 



require ("./db/connection.js");

dotenv.config();
//import route

const authRoute= require('./routes/auth')
const homeRoute= require('./routes/homePageRender')
const categoryRoute = require('./routes/categoryPageRender')
const singleNewsRoute = require('./routes/singleNewsRender')
const writenewsRoute = require('./routes/writeNews');
const pendingNewsRoute = require('./routes/pendingNewsRender')
const newsFlowController =require('./routes/newsFlowController')
const pollController = require('./routes/poll')
const postCommentRoute = require('./routes/postComment')
const collectApiNews = require('./routes/collectApiNews')
const insert = require('./routes/insert')

const ApiNewsModel = require('./models/ApiNewsModel')
//middleware
app.use(express.json());

app.use(cors());
//Router middleware

app.use('/',authRoute)
app.use('/writenews',writenewsRoute);
app.use('/postComment',postCommentRoute);
app.use(homeRoute)
app.use(categoryRoute)
app.use(singleNewsRoute)
app.use(pendingNewsRoute)
app.use(newsFlowController)
app.use(pollController)
app.use(collectApiNews)
app.use(insert)

const PORT = process.env.PORT || 3000;

 

if ( process.env.NODE_ENV == "production"){
    app.use(express.static("./globalnews/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}



app.listen(PORT,()=>{console.log("server is running in 3000")});

console.log('Before job instantiation');
const job = new CronJob('0 */50 * * * *', function() {
	ApiNewsModel.deleteMany({}).then(r=>{
    let url="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9132e413457349849b32010e5fa25fd4"
    request.get({url:url},(error,response)=>{
        const data = JSON.parse(response.body)
        //console.log(data.articles.length)
        for(let i=0;i<data.articles.length;i=i+1){
            //console.log(data.articles[i].content)
            let text = JSON.stringify(data.articles[i].content).slice(0,200)
            text.replace('\\r','')
            text.replace('\\n','')
            let news =new ApiNewsModel({
                title:data.articles[i].title,
                body:text,
                category:"bbc",
                headerImage:data.articles[i].urlToImage,
                thumbnail:data.articles[i].urlToImage,
                source:data.articles[i].source.name,
                subHeader:data.articles[i].description,
                author:data.articles[i].author,
                url:data.articles[i].url
            })
            news.save()
        }
    })

    url="https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=9132e413457349849b32010e5fa25fd4"
    request.get({url:url},(error,response)=>{
        const data = JSON.parse(response.body)
        //console.log(data.articles.length)
        for(let i=0;i<data.articles.length;i=i+1){
            //console.log(data.articles[i].content)
            let text = JSON.stringify(data.articles[i].content).slice(0,200)
            text.replace('\\r','')
            text.replace('\\n','')
            let news =new ApiNewsModel({
                title:data.articles[i].title,
                body:text,
                category:"cnn",
                headerImage:data.articles[i].urlToImage,
                thumbnail:data.articles[i].urlToImage,
                source:data.articles[i].source.name,
                subHeader:data.articles[i].description,
                author:data.articles[i].author,
                url:data.articles[i].url
            })
            news.save()
        }
    })
});
})
console.log('After job instantiation');
job.start();