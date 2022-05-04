const config=require('../config/db.config')
const {Sequelize,DataTypes}=require('sequelize')

const sequelize=new Sequelize('test_db','root','Sham@123',{
    host:'localhost',
    dialect:'mysql',
    operatorsAliases:true,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
})
sequelize.authenticate()
.then(()=>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})

const db={}
db.sequelize=sequelize
db.Sequelize=Sequelize
db.admin=require('./admin.model')(sequelize,DataTypes)
db.user=require('./user.model')(sequelize,DataTypes)
db.roles=require('./roles.model')(sequelize,DataTypes)

db.sequelize.sync({force:false})
.then(()=>{
    console.log('synced')
})
.catch(err=>{
    console.log("ERRRRR----"+err)
})

//Association

db.roles.hasMany(db.admin,{
    as:"RoleAlias",
    foreignKey:{name:'fk_roles_admin_role'},
})
db.admin.belongsTo(db.roles,{
    as:"adminAlias",
    foreignKey:{name:'fk_roles_admin_role'},
})
db.roles.hasMany(db.user,{
    as:"AliasRoles",
    foreignKey:{name:'fk_roles_user_role'},
})
db.user.belongsTo(db.roles,{
    as:"userAlias",
    foreignKey:{name:'fk_roles_user_role'},
})
module.exports=db