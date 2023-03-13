const  JWT  = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const taskModel = require("../model/taskModel");





const verifyToken = async (req,res,next)=>{

    try {
        const token = req.cookies.token;

       if(!token) return res.status(400).send({status:false,message:"Token is mandatory"})
 

    if(token){
     
        JWT.verify(token, "ashish-r-jwt" ,(err,tokenDetails)=>{
        if(err) return res.status(403).send({status:false,message:err.message})
        req.tokenDetails = tokenDetails
        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyToken", error.message)
    }
   
}



const verifyTokenAndAuthorization = async(req,res,next)=>{
    try {
        verifyToken(req,res,async()=>{
            let taskId = req.params.taskId;
            let checkUser = await taskModel.findOne({_id:taskId})
            let userId = checkUser.userId
            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
      
            if(req.tokenDetails.userId == userId){
                next()
            }else{
                res.status(403).send({status:false,message:"you are not authorized to perform this task"})
            }
        })
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyTokenAndAuthorization", error.message)
    }
}






module.exports = {verifyToken,verifyTokenAndAuthorization}