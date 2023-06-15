const Address = require('../Modals/userAddressModal');

const addAddress = async (req, res) => {
    try {
        const info = {
            user_id: req.body.user_id,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            postcode: req.body.postcode,
            street: req.body.street,
            state: req.body.state
        }
        const address = await Address.create(info)
        if (address) {
            res.status(200).json({
                status: 200,
                message: "Address add Successfully...",
                data:address
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    addAddress
}