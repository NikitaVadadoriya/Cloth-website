const Cart = require('../Modals/cart');
const Products = require('../Modals/productModal');
const Subcategory = require('../Modals/subCategoriesModal');

const addToCart = async (req, res) => {

  const cartData = JSON.parse(req.body.data);
  const user_id = req.body.user_id;
  if (cartData && cartData.length > 0) {
    cartData.forEach(async (item) => {
      const { id, quantity } = item; // Extract only the specific fields you want to add
      try {
        const createdUser = await Cart.create({ product_id: id, quantity: quantity, user_id });
        console.log('User created:', createdUser);
      } catch (error) {
        console.error('Error creating user:', error);
      }
    });
  }
  res.send('Data saved successfully');
}

const addCart = async (req, res) => {
  try {
    const info = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      totle: req.body.totle
    }

    const cart = await Cart.create(info)
    if (cart) {
      res.status(200).json({
        data: cart
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const updatecartdata = async (req, res) => {
  const { id } = req.body;
  try {
    // Update the products in the database
    const updatedProducts = await Cart.update(
      { user_id: req.user.id },
      { where: { id: id } }
    );

    res.json(updatedProducts);
  } catch (error) {
    console.error('Failed to update products:', error);
    res.status(500).json({ error: 'Failed to update products' });
  }
}

const getAllcartProduct = async (req, res) => {
  try {
    let size = parseInt(req.params.size) || 10,
      pageNo = parseInt(req.params.pageNo) || 1,
      sortBy = req.params.sortBy || "createdAt",
      sort = req.query.sort || "desc",
      where = {};

    if (sort != "desc") {
      sort = "asc";
    }

    let condition = {
      where: where,
      offset: (pageNo - 1) * size,
      limit: size,
      order: [[sortBy, sort]],
      include: [
        {
          model: Products,
          as: "product",
        },
      ],
    };
    const users = await Cart.findAndCountAll(condition);
    if (users.length === 0) {
      return res.status(200).json({
        status: 200,
        data: {
          count: 0,
          totalPage: 0 + 1,
          currentPage: pageNo,
          users: [],
        },
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: {
          count: users.count,
          totalPage: Math.ceil(users.count / size),
          currentPage: pageNo,
          users: users.rows,
        },
      });
    }
  } catch (error) {
    console.log(error)
  }
}

const getAllcartdataById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Cart.findAll({
      where: { user_id: id },
      include: [
        {
          model: Products,
          as: "product",
          include: [{ model: Subcategory, as: "subcategory" }],
        },
      ]
    })
    if (result) {
      // const foreignKeyValue = result.Products ? result.Products.Subcategory.value : null;
      res.status(200).json({
        data: result,
        message: "get successfully..."
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const Increment = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the cart item in the database
    const cartItem = await Cart.findOne({ where: { id: id } });
    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
      return res.sendStatus(200);
    }
    return res.status(404).json({ error: 'Cart item not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const Decrement = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the cart item in the database
    const cartItem = await Cart.findOne({ where: { id: id } });

    if (cartItem) {
      // Decrement the quantity (ensure it doesn't go below zero)
      cartItem.quantity = Math.max(cartItem.quantity - 1, 0);
      await cartItem.save();
      return res.sendStatus(200);
    }
    return res.status(404).json({ error: 'Cart item not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
async function deletedUser(req, res) {
  const {id} =  req.params
  try {
    let userExist = await Cart.findOne({
      where: { user_id: id },
    });
    if (userExist) {
      var deletedData = await Cart.destroy({
        where: { user_id: id },
      });
      if (deletedData) {
        res.status(200).json({ message: "Deleted Successfully" });
      } else {
        res.status(200).json({ message: "Something Went Wrong" });
      }
    } else {
      return res.status(400).json({ message: "Data Not Found" });
    }
  }

  catch (err) {
    console.log(err);
  }
}

const deletecartData = async (req, res) => {
  const id = req.query.id ? req.query.id : req.params.id;
  try {
    const cart = await Cart.findOne({ where: { id: id } });
    if (!cart) {
      return res.status(412).json({
        status: 412,
        message: "cart not Found !"
      });
    }
    await Cart.destroy({ where: { id: id } });
    return res.status(200).json({
      status: 200,
      message: "cart deleted successfully!",
      data: cart
    });
  } catch (error) {
    return res.status(412).json({
      status: 412,
      message: error.message,
    });
  }
}



module.exports =
{
  addToCart,
  getAllcartProduct,
  getAllcartdataById,
  Increment,
  Decrement,
  deletedUser,
  updatecartdata,
  addCart,
  deletecartData
}