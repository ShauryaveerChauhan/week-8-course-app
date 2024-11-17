const {Router}=require("express")
const adminRouter=Router();
const {adminModel, courseModel}=require('../database')
const jwt=require("jsonwebtoken")
const {JWT_ADMIN_SECRET}=require("../config");
const { adminMiddleware } = require("../middlewares/admin");
adminRouter.post('/signup',  async function(req,res){
    const {email,name,password}=req.body
    await adminModel.create({
        email:email,
        password:password,
        name: name
    })
    res.json({
        message:"signup succeeded"
    })
})

adminRouter.post('/signin',adminMiddleware, async function(req,res){
    const{email, password}=req.body
    const admin=  await adminModel.findOne({
         email:email,
         password:password
     })
     if (admin){
     const token=jwt.sign({
         id: admin._id
     }, JWT_ADMIN_SECRET)
     res.json({
         token: token
     })
     }
     else{ res.json({
          message:"invalid creds"
         })}
})

adminRouter.post('/course', adminMiddleware,async function(req,res){
    const adminId=req.userId
    const{name,price,description,imageURL}=req.body

    const course= await courseModel.create({
        name:name,
        description:description,
        imageURL:imageURL,
        creatorId: adminId
    })

    res.json({
        message:"course created",
        courseId:course._id
    })
})

adminRouter.put('/course',adminMiddleware ,async function(req,res){
    const adminId=req.userId
    const{name,price,description,imageURL}=req.body

    const course= await courseModel.updateOne({
        _id:courseId,
          creatorId:adminId},{
        name:name,
        description:description,
        imageURL:imageURL,
        price:price

    })

    res.json({
        message:"course updated",
        courseId:course._id
    })
    
})

adminRouter.get('/course/bulk',adminMiddleware,async   function(req,res){
    const admin=req.userId
    const courses=await courseModel.find({
        creatorId:adminId
    })
    res.json({
        message:"signup endpoint"
    })
})

module.exports={
    adminRouter:adminRouter
}