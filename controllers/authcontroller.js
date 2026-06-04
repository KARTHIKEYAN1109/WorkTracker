const User = require("../models/User")
const bcrypt = require("bcryptjs")

exports.registerUser = async (req, res) => 
    {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) 
            {
                return res.status(400).json({ message: "User already exists" })
            }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User(
            {
            name,
            email,
            password: hashedPassword
            })
        
        await user.save()
        res.status(201).json({ message: "User registered successfully" })
    }


const jwt = require ("jsonwebtoken")
exports.loginUser = async(req,res) => {
    try{
        const {email , password} = req.body
        //check for user exists
        const user = await User.findOne({ email })
        if (!User) {
            return res.status(400).json({message: "User not found"})
        }

        //compare pasword
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }

        //generate token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        //send response
        res.json({
            message: "Login Successful",
            token
        })
    }
    catch (error){
        res.status(500).json({error: error.message})
    }
}