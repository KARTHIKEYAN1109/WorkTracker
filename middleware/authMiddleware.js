const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try{
        //1. get token from header
        const token = req.headers.authorization

        if(!token){
            return res.status(401).json({message: "No token provided"})
        }

        //2. verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //3.attch user to request
        req.user = decoded
        next()
    } catch (error){
        return res.status(401).json({message:"Invalid token"})
    }
}