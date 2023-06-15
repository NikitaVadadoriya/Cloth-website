const { DataTypes, Sequelize } = require('sequelize');
const db = require('./config');
const Category=require('../Modals/categoryModal')
const Subcategory = db.define(
    "subcategory",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        subcategory_name: {
            type: DataTypes.STRING,
            allowNull: false    
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false    
        },
    },
    {
        paranoid: true
    },
    {
        tableName: "subcategory"
    }
);



Category.hasMany(Subcategory, {
    foreignKey: "category_id",
    sourceKey: "id",
    as: "product",
});
Subcategory.belongsTo(Category, {
    foreignKey: "category_id",
    targetKey: "id",
    as: "category",
});

(async () => {
    await db.sync({ force: false });   // not crete model in second time
    //console.log('sync here.....!!!');
})();

module.exports = Subcategory
