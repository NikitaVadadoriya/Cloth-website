const Order = require('../Modals/order');
const Address = require('../Modals/userAddressModal');
const Users = require('../Modals/userModal');

//ADD ORDER DATA 
const addOrder = async (req, res) => {
    try {
        const info = {
            user_id: req.body.user_id,
            address_id: req.body.address_id,
            totle: req.body.totle,
            status: req.body.status
        }
        const order = await Order.create(info)
        if (order) {
            res.status(200).json({
                status: 200,
                message: "Address add Successfully...",
                data: order
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//FET ALL ORDER DATA BY ID 
const getAllOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findAll({
            where: { id: id },
            include: [
                {
                    model: Users,
                    as: "user",
                },
                {
                    model: Address,
                    as: "address",

                }
            ]
        })
        if (order) {
            res.status(200).json({
                data: order,
                message: "get successfully..."
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//GET ALL DATA IN ORDER
const allOrder = async(req,res)=>{
    const order = await Order.findAll({
        include:[
            {
                model: Users,
                as: "user",
            },
            {
                model: Address,
                as: "address",
            } 
        ]
    })
    if(order){
        res.status(200).json({
            data:order
        })
    }
}
module.exports = {
    addOrder,
    getAllOrder,
    allOrder
}