const jwt=require('jsonwebtoken')

const {JWT_USER_SECRET}=require("../config")

function userMiddleware(req,res,next){
   const token=req.headers
   const decoded=jwt.verify(token,JWT_USER_SECRET)
   
   if (decoded){
    req.userId=decoded.Id;
    next()
   }
   else{
    res.status(403).json({
        message:"couldn't sign in"
    })
    }
   }


module.exports={
    userMiddleware:userMiddleware   
}