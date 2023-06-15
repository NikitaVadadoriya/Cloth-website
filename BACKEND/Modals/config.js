const dbConfig = require('../Config/connect');
const {Sequelize, DataTypes} = require('sequelize');

const db = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
            host :dbConfig.HOST,
            dialect:dbConfig.dialect,
            operatersAliases:false,
            logging:false,
            pool:{
                max :dbConfig.pool.max,
                min:dbConfig.pool.min,
                acquire:dbConfig.pool.acquire,
                idel:dbConfig.pool.idel
            }
    }
)
db.authenticate()
.then(()=>{
    console.log('Database are connected');
})
.catch(err=>{
    console.log('Error'+ err);
})

module.exports = db;
