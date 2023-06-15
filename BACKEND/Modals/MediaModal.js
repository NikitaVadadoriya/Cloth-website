const { DataTypes } = require('sequelize');
const db = require('./config');
const Products =require('../Modals/productModal')

const Media = db.define(
    "media",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        images: {
            type: DataTypes.STRING(400),
        },
        pid:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Products,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        }
    },
    {
        paranoid: true
    },
    {
        tableName: "media"
    }
);


Products.hasMany(Media, {
    foreignKey: "pid",
    sourceKey: "id",
    as: "productsmedia",
});

Media.belongsTo(Products, {
    foreignKey: "pid",
    targetKey: "id",
    as: "media",
});

(async () => {
    await db.sync({ force: false });   // not crete model in second time
    //console.log('sync here.....!!!');
})();

module.exports = Media
