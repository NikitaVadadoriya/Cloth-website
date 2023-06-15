const { DataTypes } = require('sequelize');
const db = require('./config');
const Products =require('../Modals/productModal')
const Stoke = db.define(
    "stoke",
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        sku:{
            type:DataTypes.STRING,
            allowNull:false
        },
        pid:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Products,
                key:'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        }
    },
    {
        paranoid:true
    },
    {
        tableName:"stoke"
    }
);


Products.hasMany(Stoke, {
    foreignKey: "pid",
    sourceKey: "id",
    as: "productstoke",
});

Stoke.belongsTo(Products, {
    foreignKey: "pid",
    targetKey: "id",
    as: "variants",
});

(async () => {
    await db.sync({ force: false });   // not crete model in second time
    console.log('sync here.....!!!');
})();

module.exports =  Stoke
