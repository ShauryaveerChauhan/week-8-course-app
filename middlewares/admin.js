const jwt=require('jsonwebtoken')

const {JWT_ADMIN_SECRET}=require("../config")

function adminMiddleware(req,res,next){
   const token=req.headers
   const decoded=jwt.verify(token,JWT_ADMIN_SECRET)
   
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
    adminMiddleware:adminMiddleware   
}