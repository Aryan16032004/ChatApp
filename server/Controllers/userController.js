const userModel = require('../Models/userModel.js');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken= (_id)=>{
const jwtkey = process.env.JWT_SECRET_KEY;

return jwt.sign({_id}, jwtkey, {
expiresIn: '3h'
})
}
const register = async (req, res) => {
   try {
     const { username, email, password } = req.body;
     console.log(req.body);
     
 
     let user= await userModel.findOne({email})
 
     if(user){
         return res.status(400).json({msg: 'User already exists'})
     }
 
     if(!username || !email || !password){
         return res.status(400).json({msg: 'Please enter all fields'})
     }
 
     if(!validator.isEmail(email)){
         return res.status(400).json({msg: 'Please enter a valid email'})
     }
 
     if(!validator.isStrongPassword(password)){
         return res.status(400).json({msg: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'})
     }
 
     user = new userModel({
         username,
         email,
         password
     })
 
     const salt= await bcrypt.genSalt(10)
 
     user.password= await bcrypt.hash(user.password, salt)
 
     user.save()
     const token= createToken(user._id)
 
     res.status(200).json({token, user:{
         id: user._id,
         username: user.username,
         email: user.email
     }})
   } catch (error) {
     console.log(error);
     res.status(500).json({msg: 'Registration Error'})
    
   }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });

        if(!user){
            return res.status(400).json({msg: 'User does not exist'})
        }

        const isValidaPassword = await bcrypt.compare(password, user.password)

        if(!isValidaPassword){
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        const token= createToken(user._id)

        res.status(200).json({token, user:{
            id: user._id,
            username: user.username,
            email: user.email
        }})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Login Error'})
        
    }
}

const findUser = async(req,res)=>{
    const userId =req.params.userId;
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'User not found'})
    }
}

const getUsers= async(req,res)=>{
   try {
     const users= await userModel.find()
     res.status(200).json(users)
   } catch (error) {
     console.log(error);
     res.status(500).json({msg: 'Error getting users'})
    
   }
}
module.exports= { register , login ,findUser,getUsers};