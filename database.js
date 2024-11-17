const mongoose=require('mongoose')


const Schema =   mongoose.Schema
const ObjectId  =   Schema.ObjectId

const user= new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String
})

const course=new Schema({
    _Id:ObjectId,
    name:String,
    price:Number,
    description:String,
    imageURL:String,
   
})
 const admin= new Schema({
      _Id:ObjectId,
      name:String,
      email:{type:String,unique:true},
      password:String
 })

 const purchase= new Schema({
    _Id:ObjectId,
    courseId:ObjectId,
    userId:ObjectId
 })

const userModel=mongoose.model('user',user)
const courseModel=mongoose.model('course',course)
const adminModel=mongoose.model('admin',admin)
const purchaseModel=mongoose.model('purchase',purchase)

module.exports={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}