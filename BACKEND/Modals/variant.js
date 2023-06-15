const { DataTypes } = require('sequelize');
const db = require('./config');
const Products = require('../Modals/productModal')

const Variant = db.define(
    "variants",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        size: {
            type: DataTypes.STRING,
        },
        color: {
            type: DataTypes.STRING,
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Products,
                key: 'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        }
    },
    {
        paranoid: true
    },
    {
        tableName: "variants"
    }
);


Products.hasMany(Variant, {
    foreignKey: "pid",
    sourceKey: "id",
});

Variant.belongsTo(Products, {
    foreignKey: "pid",
    targetKey: "id",
});

(async () => {
    await db.sync({ force: false });   // not crete model in second time
    //console.log('sync here.....!!!');
})();

module.exports = Variant
