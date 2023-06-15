const { DataTypes, Sequelize } = require('sequelize');
const db = require('./config');
const Subcategory = require('./subCategoriesModal');

const Products = db.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totle_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subcategory_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Subcategory,
                key:'id'
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }
    },
    {
        paranoid: true
    },
    {
        tableName: "products"
    }
);


Subcategory.hasMany(Products, {
    foreignKey: "subcategory_id",
    sourceKey: "id",
    as: "products",
});

Products.belongsTo(Subcategory, {
    foreignKey: "subcategory_id",
    targetKey: "id",
    as: "subcategory",
});

(async () => {
    await db.sync({ force: false });   // not crete model in second time
   // console.log('sync here.....!!!');
})();

module.exports = Products
