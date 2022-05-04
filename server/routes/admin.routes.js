const adminController=require('../controller/admin.controller')
const router=require('express').Router()
router.post('/addAdmin',adminController.addAdmin)

module.exports=router