const User=require("../model/User")
const bcrypt=require("bcrypt")

const handleLogin = async(req,res)=>{
    const {user,pwd} =req.body;
    if (!user||!pwd) return res.status(400).json({"message":"username and password is required"})
    
    const foundUser = await User.findOne({username:user}).exec()
    if (!foundUser) return res.status(401).json({"message":"unauthorized"})
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match){
        res.json({"message":`user ${user} is successfully logged in`})
    }else{
        res.status(401)
    }

}
module.exports={handleLogin}