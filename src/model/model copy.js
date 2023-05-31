const mongoose = require('mongoose')

const schema =  new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,  
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String
    }
})

const contact = new mongoose.model('Contact',schema);

module.exports = contact;