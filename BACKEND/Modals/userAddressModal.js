const { DataTypes } = require('sequelize');
const db =require('./config');
const Users = require('./userModal');

const Address = db.define(
    "address",
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        address:{
            type:DataTypes.STRING,
            unique:true
        },
        city:{
            type:DataTypes.STRING,
            allowNull:false
        },
        country:{
            type:DataTypes.STRING
        },
        postcode:{
            type:DataTypes.STRING
        },
        street:{
            type:DataTypes.STRING
        },
        state:{
            type:DataTypes.STRING
        }
    },
    {
        paranoid:true
    },
    {
        tableName:"address"
    }
);
Users.hasMany(Address, {
    foreignKey: "user_id",
    sourceKey: "id",
    as: "address",
  });
  Address.belongsTo(Users, {
    foreignKey: "user_id",
    targetKey: "id",
    as: "user",
  });
(async () => {
    await db.sync({ force: false });   // not crete model in second time
   // console.log('sync here.....!!!');
})();

module.exports =  Address
