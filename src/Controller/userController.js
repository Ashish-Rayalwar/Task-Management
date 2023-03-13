const bcrypt = require("bcryptjs");
const userModel = require("../Model/userModel")
let JWT = require("jsonwebtoken")
let loginUser = async(req,res)=>{
    try {
        let data = req.body

    let {email,password} = data
    let bcryptPass = await bcrypt.hash(password, 10)
    let findUser = await userModel.findOne({email:email})

   
    if(!findUser){
        
        let userData = {}
        userData.email=email
        userData.password=bcryptPass
      
        let createUser = await userModel.create(userData)
 
        let userId = createUser._id
     
        let {password,...doc} = createUser._doc
    
     
        let token = JWT.sign({ userId: userId }, "ashish-r-jwt", {expiresIn: 86400});
        console.log(token);
        return res.cookie("token",token,{
            httpOnly:true,
        }).status(200).send(doc)

    }else{
      
        let userPassword = findUser.password
      
       let newPass = data.password
        let originalPassword = await bcrypt.compare(newPass, userPassword)
        if(!originalPassword) return res.status(401).send({status:false, message:"Incorrect password, plz provide valid password"})
        let userId = findUser._id
       
        let token = JWT.sign({ userId: userId },"ashish-r-jwt", {expiresIn: 86400});
        let {password,...doc} = findUser._doc
        return res.cookie("token",token,{
            httpOnly:true,
        }).status(200).send(doc)

    }
    } catch (error) {
        console.log(error.message);
    }
    

}

const logout = async (req, res) => {
    res
      .clearCookie("token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("User has been logged out.");
  };

  module.exports = {loginUser,logout}