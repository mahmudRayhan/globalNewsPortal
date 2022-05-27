const express = require('express')
const router = express.Router();
const SignUpModel = require('../models/SignUpModel')
const ApiNewsModel = require('../models/ApiNewsModel')
const request = require('request')

router.get('/insert',(req,res)=>{
    // let news =new NewsModel({
    //     title:"Trump kicks off revenge tour with eyes on one Ohio Republican",
    //     body:`Donald Trump on Saturday will kick off his revenge tour against Republicans who defied him in the aftermath of the 2020 election and January 6 insurrection, hoping to convince his supporters to fire Ohio Rep. Anthony Gonzalez.

    //     The effort to oust the Republicans who crossed him will be one of the biggest tests of Trump's post-presidential power, assessing whether the former President still has the sway with base Republican voters that he enjoyed during his four years in the White House. Trump's trip to Northeast Ohio is expressly meant to remind voters in the area of Gonzalez's vote to impeach the Republican president earlier this year, and boost Max Miller, a former Trump aide who is challenging the congressman in the district's Republican primary next year.
    //     Trump cheered as Republicans in the Ohio congressional district erupted in anger after Gonzalez, a two-term congressman who had largely toed the Republican line, voted in favor of impeachment. Some voters accused him of doing the "unthinkable," while others fumed that they had to wait until 2022 to oust him.`,
    //     category:"international",
    //     tag:"Trump",
    //     headerImage:"../assets/images/news1.jpg",
    //     thumbnail:"../assets/images/news0.jpg",
    //     reporterID:"60d84344b596742e303fb303"
    // })
    // news.save().then(docs=>res.send(docs))

    // let user=new SignUpModel({
    //     fullName:"subEditor",
    //     lastName:"world",
    //     email:"se2@example.com",
    //     password:"1234",
    //     birthday:"12/12/1994",
    //     userRole:"sub-editor",
    //     gender:"male",
    //     phoneNum:"01902728120",
    //     userDesk:'international'
    // })
    // user.save().then(response=>{
    //     res.send(response)
    // })

})

module.exports = router