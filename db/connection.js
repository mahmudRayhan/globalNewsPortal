var mongoose = require('mongoose')

/*
const databaseURL ="mongodb://localhost:27017/globalNews"

mongoose.connect(databaseURL
,{useNewUrlParser:true, useUnifiedTopology:true}).then(
    ()=>console.log("Connection Successful!")
).catch( (error) => console.log(error));

*/

const databaseURL ='mongodb+srv://user01:987654321@globalnews.22wx3.mongodb.net/globalNews_database?retryWrites=true&w=majority/';
mongoose.connect(databaseURL,{
        useNewUrlParser:true, 
        useCreateIndex: true,
        useFindAndModify: false ,
        useUnifiedTopology:true
    }).then(
        ()=>console.log("Connection Successful with Mongodb atlas!")
    ).catch( (error) => console.log(error));

