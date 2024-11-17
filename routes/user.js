
const {Router }= require('express')
const {userModel, purchaseModel, courseModel}=require('../database')
const userRouter=Router();
const jwt=require("jsonwebtoken")
const {JWT_USER_SECRET}=require("../config");
const { userMiddleware } = require('../middlewares/user');
const user = require('../middlewares/user');


userRouter.post('/signup',async function(req,res){
    const {email,name,password}=req.body
     await userModel.create({
        email:email,
        password:password,
        name:name
    })
    res.json({
     message:"signup succeeded"
    })
     
 })
 
 userRouter.post('/signin',async function(req,res){
    const{email, password}=req.body
   const user=  await userModel.findOne({
        email:email,
        password:password
    })
    if (user){
    const token=jwt.sign({
        id: user._id
    }, JWT_USER_SECRET)
    res.json({
        token: token
    })
    }
    else{ res.json({
         message:"invalid creds"
        })}
     
 }) 
 
 userRouter.post('/purchase',userMiddleware,async function(req,res){

    const userId=req.userId
    const courseId=req.courseId

    await purchaseModel.create({
        userId:userId,
        courseId:courseId
    })
    
   
     res.json({
         message:"signup endpoint"
        })
 
 })
 userRouter.get('/purchase',userMiddleware,async function(req,res){
    const userId=req.userId

    const purchase=await purchaseModel.find({
        userId
      
    })
    const courseData=await courseModel.find({
      _id:{$in: purchase.map(x=>x.courseId)}
    })
    res.json({
        message:"Bought courses",
        purchase,
        courseData
    })
 })

module.exports={
    userRouter: userRouter
}