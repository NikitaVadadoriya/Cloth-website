const User = require('../Modals/userModal');
const { Joi } = require('express-validation');
const bcrypt = require('bcrypt');
const Products = require('../Modals/productModal');
const Category = require('../Modals/categoryModal');
const Subcategory = require('../Modals/subCategoriesModal');
const Variant = require('../Modals/variant');


// ADD PRODUCTS🤞🤞

const addProduct = async (req, res) => {
  try {
    const validationSchema = Joi.object().keys({
      product_name: Joi.string().required(),
      description: Joi.string().required(),
      totle_price: Joi.required(),
      subcategory_id: Joi.required()
    })
    const validate = validationSchema.validate(req.body);
    if (validate.error) {
      return res.status(412).json({
        status: 412,
        message: validate.error.details[0].message
      })
    }
    const product = await Products.create({
      product_name: req.body.product_name,
      description: req.body.description,
      totle_price: req.body.totle_price,
      subcategory_id: req.body.subcategory_id
    });

    return res.status(200).json({
      status: 200,
      message: "product added successfully",
      data: product,
    });
  } catch (error) {
    return res.status(412).json({
      status: 412,
      message: error.message,
    });
  }
}

//GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
  try {
    let product = await Products.findAll({});
    res.status(200).send({ data: product });
  } catch (error) {
    console.log(error)
  }
}

// GET PRODUCT WITH SUBCATEGORY DATA
const getProductCategoryandSubcategory = async (req, res) => {
  try {
    let product = await Products.findAll({
      include: [
        {
          model: Subcategory,
          as: "subcategory",
        },

      ]

    });
    res.status(200).send({ data: product });
  } catch (error) {
    console.log(error)

  }
}

//GET PRODUCT WISE CATEGORY BY WOMEN
const getProductByWomen = async (req, res) => {
  try {
    let product = await Products.findAll({

      include: [
        {
          model: Subcategory,
          as: "subcategory",
          where: { category_id: 1 },
          // attributes: ['product_name', 'description', 'totle_price']
          include: [{
            model: Category,
            as: "category",

            attributes: { exclude: ['id', 'category_name', 'image', 'createdAt', 'updatedAt', 'deletedAt'] }
          }]
        },

      ]
    });
    res.status(200).send({ data: product });
  } catch (error) {
    console.log(error)

  }
}

//GET PRODUCT WISE CATEGORY BY MEN
const getProductByMen = async (req, res) => {
  try {
    let product = await Products.findAll({

      include: [
        {
          model: Subcategory,
          as: "subcategory",
          where: { category_id: 2 },
          // attributes: ['product_name', 'description', 'totle_price']
          include: [{
            model: Category,
            as: "category",
            attributes: { exclude: ['id', 'category_name', 'image', 'createdAt', 'updatedAt', 'deletedAt'] }
          }]
        },
      ]
    });
    res.status(200).send({ data: product });
  } catch (error) {
    console.log(error)

  }
}

//GET PRODUCT WISE CATEGORY BY CHILD
const getProductByChild = async (req, res) => {
  try {
    let product = await Products.findAll({

      include: [
        {
          model: Subcategory,
          as: "subcategory",
          where: { category_id: 3 },
          // attributes: ['product_name', 'description', 'totle_price']
          include: [{
            model: Category,
            as: "category",

            attributes: { exclude: ['id', 'category_name', 'image', 'createdAt', 'updatedAt', 'deletedAt'] }
          }]
        },
      ]
    });
    res.status(200).send({ data: product });
  } catch (error) {
    console.log(error)

  }
}

//GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Products.findOne({
      where: { id },
    })
    if (result) {
      res.status(200).json({
        data: result,
        message: "get successfully..."
      })
    }
  } catch (error) {
    console.log(error)
  }
}

//UPDATE PRODUCT BY ID
const updateProduct = async (req, res) => {
  const query = req.body;
  const id = req.query.id ? req.query.id : req.params.id;
  try {
          var updateData = await Products.update(
            {
              product_name: query.product_name,
              totle_price: query.totle_price,
              description: query.description,
              subcategory_id: query.subcategory_id,
            },
            {
              where: {id: id},
            }
          );
          if (updateData) {
            res.status(200).json({ message: "User Update Successfully",updateData });
          } else {
            res.status(200).json({ message: "Something Went Wrong" });
          }
        } 
   catch (err) {
    console.log(err);
  }
}

//DELETE PRODUCT BY ID
const deleteProduct = async (req, res) => {
  const id = req.query.id ? req.query.id : req.params.id;
  try {
    const product = await Products.findOne({ where: { id: id } });
    if (!product) {
      return res.status(412).json({
        status: 412,
        message: "product not Found !"
      });
    }
    await Products.destroy({ where: { id: id } });
    return res.status(200).json({
      status: 200,
      message: "Product deleted successfully!",
      data: product
    });
  } catch (error) {
    return res.status(412).json({
      status: 412,
      message: error.message,
    });
  }
}

//GET VARIANT WISE PRODUCT
const getVariantById = async (req, res) => {
  try {
    const subcategory_id = req.params.id;
    const result = await Products.findOne({
      where: { subcategory_id },
      include: [
        {
          model: Variant,

          attributes: ['color', 'size']
        }
      ]
    })
    if (result) {
      res.status(200).json({
        data: result,
        message: "get successfully..."
      })
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  addProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductCategoryandSubcategory,
  getProductByWomen,
  getProductByChild,
  getProductByMen,
  getVariantById
}





