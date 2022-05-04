const db=require('../models')
require('sequelize')
const Admin=db.admin
//for encrypting password
const{genSaltSync,hashSync}=require('bcrypt');
const { sequelize } = require('../models');

const addAdmin=async(req,res)=>{
    const salt=genSaltSync(10)
    let info={
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        phone_number:req.body.phone_number,
        designation:req.body.designation
    }
    let pass=req.body.name+"@123"
    info.password=hashSync(pass,salt)
    let date=new Date()
    info.created_at=date
    info.created_by='admins'
    console.log(date)
    const admin=await Admin.create(info)
    res.status(200).send({Message:"success"})
}

module.exports={addAdmin}