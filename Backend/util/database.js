const Sequelize=require('sequelize')

const sequelize=new Sequelize('expense-tracker','root','asdf@#$%678',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;