const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.isAuthneticated = async(req,res,next) => {
    try {
        const {token} = req.cookies
        console.log(req.cookies.token);

        if(!token){
            return res.status(401).json({
                message:"please login first"
            })
        }
        
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)

        req.user = await User.findById(decoded._id)

        next()
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}