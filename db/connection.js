var mongoose = require('mongoose')

const databaseURL ="mongodb://localhost:27017/globalNews"

mongoose.connect(databaseURL
,{useNewUrlParser:true, useUnifiedTopology:true}).then(
    ()=>console.log("Connection Successful!")
).catch( (error) => console.log(err));
