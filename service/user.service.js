const User = require('../model/user.model')


const getEmail = (email)=>{
    return User.findOne(email)
}

const createFields = (fields)=>{
    return User.create(fields)
}

module.exports = {getEmail,createFields}