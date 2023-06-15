const { DataTypes, Sequelize } = require('sequelize');
const db = require('./config');
const Users = require('./userModal');
const Address = require('./userAddressModal');

const Order = db.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Users,
          key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Address,
          key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    totle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    paranoid: true
  },
  {
    tableName: "order"
  }
);

Users.hasMany(Order, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "order",
});
Order.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

Address.hasMany(Order, {
  foreignKey: "address_id",
  sourceKey: "id",
  as: "order",
});
Order.belongsTo(Address, {
  foreignKey: "address_id",
  targetKey: "id",
  as: "address",
});

(async () => {
  await db.sync({ force: false });   // not crete model in second time
  //console.log('sync here.....!!!');
})();

module.exports = Order
