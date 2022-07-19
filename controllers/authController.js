const User=require("../model/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require('dotenv').config();

const handleLogin = async(req,res)=>{
    const {user,pwd} =req.body;
    if (!user||!pwd) return res.status(400).json({"message":"username and password is required"})
    
    const foundUser = await User.findOne({username:user}).exec()
    if (!foundUser) return res.status(401).json({"message":"unauthorized"})
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match){
        const accessToken = jwt.sign(

            {"usename":foundUser.username},
            process.env.ACCESS_TOKEN,
            {expiresIn:"5m"}
        )
        const refreshToken = jwt.sign(
            {"usename":foundUser.username},
            process.env.REFRESH_TOKEN,
            {expiresIn:"1d"}
        )
        foundUser.refreshToken=refreshToken
        const result= await foundUser.save()
        // console.log(result)
        res.cookie("jwt",refreshToken,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken });
    }else{
        res.status(401)
    }

}
module.exports={handleLogin}