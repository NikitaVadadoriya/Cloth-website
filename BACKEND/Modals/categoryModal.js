const { DataTypes, Sequelize } = require('sequelize');
const db = require('./config');

const Category = db.define(
    "category",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true    
        },
        category_name: {
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
        tableName: "category"
    }
);
(async () => {
    await db.sync({ force: false });   // not crete model in second time
   // console.log('sync here.....!!!');
})();

module.exports = Category
