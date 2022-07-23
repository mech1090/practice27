const {userValidation} = require('../validation/user.validation')
const config = require('config')
const bcrypt = require('bcrypt')
const User = require('../model/user.model')
const userService = require('../service/user.service')


const getLoginForm = (req,res)=>{
    return res.render('login/layout')
}

const login =async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidation(fields)
    if(error){
        return res.render('login/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(!findUser){
        return res.render('login/layout',{message:"User not exist Signup here"})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credential Wrong'})
    }

    return res.render('user/layout')


}

const getSignupForm = (req,res)=>{
    return res.render('signup/layout')
}

const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidation(fields)
    if(error){
        return res.render('login/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User Exists Login Here'})
    }
    const hatchPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const createUser = await userService.createFields({email,password:hatchPassword})
    return res.render('login/layout',{message:'User Created'})
}

module.exports = { getLoginForm,login,getSignupForm,signup}