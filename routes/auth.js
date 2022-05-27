const router = require('express').Router();
const signUpTemplateCopy=require('../models/SignUpModel.js')
//const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const verify= require('./verifyToken')

const ObjectID = require('mongodb').ObjectID;


const multer = require('multer');
const path = require('path');
const News = require('../models/NewsModel')



// const joi = require('@hapi/joi')

// const schema = {
//     name : Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required()
// }



const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,"./globalnews/public/assets/uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
})

const upload = multer ({storage:storage});

router.post('/upload/:id',upload.single("profilePic"),(request,response)=>{
    console.log("gone to upload")
    console.log(request.params.id)
    signUpTemplateCopy.findOne({_id:request.params.id})
    .then((user)=>{
        user.profilePic= request.file.originalname

        user.save().then(
            (data)=>{
                response.json(data)
            }
        ).catch( 
            (error)=>{
                response.json(error)
            }
        ) 
    }).catch( 
        (error)=>{
            response.json(error)
        }
    ) 
    

 
})

router.post('/search',async (request,response)=>{

    const text=request.body.text
    console.log(text)
    
     if(text!=''){
        News.find({
            "$or": [
                { title : { $regex: text, $options: "i" } } ,
                { body : { $regex: text, $options: 'i' } }
            ]
        }
            
         )
        .then(newses =>{

            console.log(newses)
            response.send(newses)
        } )
        .catch(err => console.log(err) );
     }
})

router.post('/update/:id',(request,response)=>{
    console.log("gone to update")
    console.log(request.body)
    console.log(request.params.id)
    signUpTemplateCopy.findOne({_id:request.params.id})
    .then((user)=>{

        console.log("now here")
        console.log(user)
        

        if(user.password===request.body.password){
            console.log("going to udate")
            user.fullName=request.body.fullName,
            user.lastName=request.body.lastName,
            user.email=request.body.email,
            user.birthday=request.body.birthday,
            user.gender=request.body.gender,
            user.phoneNum=request.body.phoneNum

            user.save().then(
                console.log("here 2"),
                response.send({isUpdated:true,message:"Update Successful!"}),
                console.log("Update Successful!")
            ).catch( 
                (error)=>{
                    console.log(error)
                    response.json(error)
                }
            )
        }else{

            response.send({isUpdated:false,id:"",message:"Enter Correct Password to update!"})
            console.log("wrong password!")

        }

        

         
    }).catch( 
        (error)=>{
            response.json(error)
        }
    ) 
    
    

    
    
 
})



router.post('/signup',(request,response)=>{
    
    console.log("here!")
    console.log(request.body)
    console.log(request.body.fullName)

  
//    const validation= Joi.validate(request.body,schema)
//     response.send(error.details[0].message,validation)
//        if(error) return res.status(400).send(error.details[0].message)

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(request.body.password,salt);
    
    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password,
        gender:request.body.gender,
        birthday:request.body.birthday
    })
    
    

    signedUpUser.save().then(
        (data)=>{
            response.json(data)
        }
    ).catch( 
        (error)=>{
            response.json(error)
        }
    ) 
    
 
})




router.post('/staffRegister',(request,response)=>{
    
    console.log("here!")
    console.log(request.body)
    console.log(request.body.fullName)

  
//    const validation= Joi.validate(request.body,schema)
//     response.send(error.details[0].message,validation)
//        if(error) return res.status(400).send(error.details[0].message)

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(request.body.password,salt);
    
    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        lastName:request.body.lastName,
        email:request.body.email,
        password:request.body.password,
        gender:request.body.gender,
        birthday:request.body.birthday,
        userRole:request.body.userRole,
        userDesk:request.body.userDesk
    })
    
    

    signedUpUser.save().then(
        (data)=>{
            response.json(data)
        }
    ).catch( 
        (error)=>{
            response.json(error)
        }
    ) 
    
 
})





router.post('/signin',async (request,response)=>{
    //console.log(request.body);
    try{
        console.log(request.body.email)
        console.log(request.body.password) 

        const email= request.body.email;
        const password=request.body.password;
        
        async function doSomething() {
           
            const userEmail= await signUpTemplateCopy.findOne({email:email});
            console.log(userEmail);
            if(userEmail!==null){
                if(userEmail.password=== password){
                    message="login successful!"
                    
                    // response.send({isLoggedin:true,id:userEmail.id,message:"Login Successful!"})
                
                    console.log("login successful!")
                    const token =jwt.sign({id: userEmail._id},
                        process.env.TOKEN_SECRET,{expiresIn:"1h"}
                    )

        //expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        //expiresIn: 120 // it will be expired after 120ms
        //expiresIn: "120s" // it will be expired after 120s

                    response.header('auth-token',token).send({tokenNo:token,isLoggedin:true,id:userEmail.id,message:"Login Successful!"})
                    
                    //request.flash('success_msg','You are now registered and can login')
                    //response.redirect('/users/login');
                }else{

                    message="Wrong Email or Password!"

                    response.send({isLoggedin:false,id:"",message:"Wrong Email or Password!!"})

                    console.log("wrong password!")
                    
                }
            }else{
                message="Wrong Email or Password!"

                response.send({isLoggedin:false,id:"",message:"Wrong Email or Password!!"})

                console.log("Wrong Email!")
            }
            
        }
        doSomething()
        

        
    }catch(error){ 
            response.status(400).render('Invalid Login');
    }
    
 
})







router.get('/dashboard',verify,async (req,res)=>{
    //console.log("gone to dashboard")

    let objectId = new ObjectID(req.user.id);
    //console.log(objectId);
    await signUpTemplateCopy.findOne({_id:objectId})
        .then(user=>{
            res.send({
                id:req.user._id,
                fullName: req.user.fullName,
                lastName: req.user.lastName,
                email:req.user.email,
                profilePic:req.user.profilePic,
                phoneNum: req.user.phoneNum,
                gender: req.user.gender,
                birthday:req.user.birthday,
                userRole: req.user.userRole,
                userDesk: req.user.userDesk
            })
        })

})


module.exports = router