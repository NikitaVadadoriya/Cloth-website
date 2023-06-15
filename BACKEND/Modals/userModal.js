const { DataTypes } = require('sequelize');
const db = require('./config');

const Users = db.define(
    "users",
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING
        },
        roleType:{
            type:DataTypes.STRING
        }
    },
    {
        paranoid:true
    },
    {
        tableName:"users"
    }
);
(async () => {
    await db.sync({ force: false });   // not crete model in second time
    //console.log('sync here.....!!!');
})();

module.exports =  Users
