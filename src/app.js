//require('dotenv').config();
const express= require('express')

const port= process.env.port || 3000;
const app = express();
const mongoose = require('mongoose');
require('./conn/conn')
const Contact = require('./model/model');
const path= require('path');
const hbs=require('hbs');
const contact = require('./model/model');

const staticpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath))
hbs.registerPartials(partialpath)
app.set('view engine','hbs');
app.set('views',viewpath)

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/contact',async (req,res)=>{
   try{
    console.log(req.body);
    const newdata = new contact(req.body);


    const data = await newdata.save();
   
    res.render('index');
    
   }
   catch(e)
   { 
   
     if(e.name && e.name=="ValidationError")
     {
        res.send('email and name feild is required');
     }
     if(e.keyPattern.email==1)
     {
        res.send('this email id is used before,please try other email');
     }
     
   
   }
})


app.listen(port,()=>{
    console.log('listening')
})