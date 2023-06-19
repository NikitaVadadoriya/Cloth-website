const { Sequelize, where } = require('sequelize');
const Products = require('../Modals/productModal');
const Variant = require('../Modals/variant');
const Subcategory = require('../Modals/subCategoriesModal');
const Category = require('../Modals/categoryModal');

const addVariant = async (req, res) => {
    try {
        const { color, size, pid } = req.body;
        const colorArray = color.split(',');
        const sizeArray = size.split(',');
        const variantsToAdd = [];
    
        colorArray.forEach((colorValue) => {
          sizeArray.forEach((sizeValue) => {
            variantsToAdd.push({
              color: colorValue.trim(),
              size: sizeValue.trim(),
              pid,
            });
          });
        });
    
        const createdVariants = await Variant.bulkCreate(variantsToAdd);
        res.status(201).json({ message: 'Variants added successfully', createdVariants });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

// Assuming you have the colorId as input in the request body or parameters

async function getProductsByColor(req, res) {
    const colors = req.query.colors ? req.query.colors.split(',') : [];
    try {
        const variants = await Products.findAll({

            include: [{
                model: Variant,
                attributes: { exclude:['size','color','pid','id','createdAt','updatedAt','deletedAt'] },
                where: {
                    color: {
                        [Sequelize.Op.in]: colors,
                    },

                },
            },
            {
                model: Subcategory,
                as:"subcategory"
            }],
        });
        if (variants) {
            res.status(200).json({
                data: variants
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


async function getProductsBySize(req, res) {
    const { size } = req.params;
    try {
        const variants = await Products.findAll({

            include: [{
                model: Variant,
                attributes: { exclude:['size','color','pid','id','createdAt','updatedAt','deletedAt'] },
                where: {
                    size: {
                        [Sequelize.Op.like]: `%${size}%`,
                    },
                },
            },
            {
                model: Subcategory,
                as:"subcategory"
            }],
        });
        if (variants) {
            res.status(200).json({
                data: variants
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllVariant = async (req, res) => {
    try {
        const colors = await Variant.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('color')), 'color']],
            raw: true,
        });

        const sizes = await Variant.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('size')), 'size']],
            raw: true,
        });

        const uniqueColors = colors.map((color) => color.color);
        const uniqueSizes = sizes.map((size) => size.size);

        const result = {
            colors: uniqueColors,
            sizes: uniqueSizes,
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getAllVariantById = async (req, res) => {
    const id = req.query.id ? req.query.id : req.params.id;
    try {
        const colors = await Variant.findAll({
            where :{pid:id},
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('color')), 'color']],
            raw: true,
        });

        const sizes = await Variant.findAll({
            where :{pid:id},
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('size')), 'size']],
            raw: true,
        });

        const uniqueColors = colors.map((color) => color.color);
        const uniqueSizes = sizes.map((size) => size.size);

        const result = {
            colors: uniqueColors,
            sizes: uniqueSizes,
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const allFilter =async(req,res)=>{
    const { colors, sizes, subcategories} = req.query;
    try {
        const products = await Products.findAll({
          include: [
            {
              model: Variant,
              attributes: { exclude:['size','color','pid','id','createdAt','updatedAt','deletedAt'] },
              where: {
                color: colors ? colors.split(',') : undefined,
                size: sizes ? sizes.split(',') : undefined,
              },
            },
            {
              model: Subcategory,
              as:'subcategory',
              where: {
                subcategory_name: subcategories ? subcategories.split(',') : undefined,
              },
            },
          ],
        });
        res.json({data:products});
      } catch (error) {
        console.error('Error filtering products:', error);
        throw error;
      }
}

const getAllVariantData=async(req,res)=>{
const variant = await Variant.findAll({
    include:[{
        model:Products,
        as:"Product",
        include:[{
            model:Subcategory,
            as:"subcategory"
        }]
 }]
});
 if(variant){
    res.status(200).json({
        data:variant
    })
 }
}

const priceFilter =async(req,res)=>{
    const {minPrice, maxPrice } = req.query;
    try {
        const products = await Products.findAll({
            where: {
                totle_price: {
                  [Sequelize.Op.between]: [minPrice, maxPrice],
                },
              },
              include: [
                {
                    model: Subcategory,
                    as:'subcategory',
                }
              ]
            })
            res.json({data:products})
        } catch (error) {
            console.error('Error filtering products:', error);
            throw error;
          }
}

module.exports =
{
    addVariant,
    getProductsByColor,
    getProductsBySize,
    getAllVariant,
    getAllVariantById,
    allFilter,
    getAllVariantData,
    priceFilter
}