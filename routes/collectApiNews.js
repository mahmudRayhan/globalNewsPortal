const express = require('express')
const router = express.Router();
const ApiNewsModel = require('../models/ApiNewsModel')
const request =require('request')
const axios = require('axios')

router.get('/collect',(req,res)=>{
    ApiNewsModel.deleteMany({}).then(r=>{
        const url="https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=9132e413457349849b32010e5fa25fd4"
    request.get({url:url},(error,response)=>{
        const data = JSON.parse(response.body)
        //console.log(data.articles.length)
        res.send(data)
        for(let i=0;i<data.articles.length;i=i+1){
            //console.log(data.articles[i].content)
            let text = JSON.stringify(data.articles[i].content).slice(0,200)
            text.replace('\\r','')
            text.replace('\\n','')
            let news =new ApiNewsModel({
                title:data.articles[i].title,
                body:text,
                category:"aggregated",
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
    
    // var options = {
    //     method: 'GET',
    //     url: 'https://free-news.p.rapidapi.com/v1/search',
    //     params: {q: 'Elon Musk', lang: 'en'},
    //     headers: {
    //       'x-rapidapi-key': '75b6e3a9b6msh55b0388343791f1p159616jsne83f5434d35a',
    //       'x-rapidapi-host': 'free-news.p.rapidapi.com'
    //     }
    //   };
      
    //   axios.request(options).then(function (response) {
    //       console.log(response.data);
    //   }).catch(function (error) {
    //       console.error(error);
    //   });
           
})
})

module.exports = router