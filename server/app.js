require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
var corsOption={
    origin:'http://localhost:4200'
}

app.use(cors(corsOption))
//for form data use body-parser
const bodyparser=require('body-parser')
app.use(bodyparser.json())
//to encoded url
app.use(bodyparser.urlencoded({extended:true}))


const router=require('./routes/admin.routes')
app.use('/api',router)
app.listen(process.env.PORT,()=>{
    console.log("server started at ",process.env.PORT)
})
app.get('/api',(req,res)=>{
    res.json({mesa:"hello"})
})
    
    // app.use(express.json())
    // app.use(express.urlencoded({extended:true}))