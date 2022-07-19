const jwt=require("jsonwebtoken")
require('dotenv').config();

const verifyJwt = async(req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.sendStatus(401)
    const token= authHeader.split(" ")[1];
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            next();
        }
    )

}

module.exports = verifyJwt;