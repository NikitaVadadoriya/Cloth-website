const { DataTypes, Sequelize } = require('sequelize');
const db = require('./config');
const Product = require('../Modals/productModal')
const Users = require('../Modals/userModal')
const Cart = db.define(
    "cart",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Product,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Users,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        totle: {
            type: DataTypes.INTEGER,
            
        }
    },
    {
        paranoid: true
    },
    {
        tableName: "cart"
    }
);

Product.hasMany(Cart, {
    foreignKey: "product_id",
    sourceKey: "id",
    as: "cart",
});
Cart.belongsTo(Product, {
    foreignKey: "product_id",
    targetKey: "id",
    as: "product",
});


Users.hasMany(Cart, {
    foreignKey: "user_id",
    sourceKey: "id",
    as: "cart",
});
Cart.belongsTo(Users, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "user",
});


(async () => {
    await db.sync({ force: false });   // not crete model in second time
    // console.log('sync here.....!!!');
})();

module.exports = Cart
