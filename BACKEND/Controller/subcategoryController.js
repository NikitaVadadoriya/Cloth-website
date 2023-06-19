const Subcategory =require('../Modals/subCategoriesModal');
const Products = require('../Modals/productModal');
const Category = require('../Modals/categoryModal');
const { Sequelize } = require('sequelize');


const addSubcategory =async(req,res)=>{
    try {
        
    req.body.image=req.file;
        const variant =await Subcategory.create({
            category_id:req.body.category_id,
            subcategory_name:req.body.subcategory_name,
            image:req.file.path
        })
        if(variant){
            res.status(200).json({
                status:200,
                message:"subcategory inserted..."
            })
        }
    } catch (error) {
        console.log(error)
    }
   
}

//GET ALL  SUBCATEGORY NAME IN ARRAY
const getAllSubcategory = async (req, res) => {
  try {
    const sub = await Subcategory.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('subcategory_name')), 'subcategory_name']],
        raw: true,
    });


    const uniquesub = sub.map((subcategory_name) => subcategory_name.subcategory_name);

    const result = {
        subcategory_name: uniquesub,
    };

    res.json(result);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
}

//GET ALL DATA IN SUBCATEGORY 
const getAll =async(req,res)=>{
  const subcategory=await Subcategory.findAll({});
  if(subcategory){
    res.status(200).json({
      data:subcategory
    })
  }
}

//GET SUBCATEGORY BY ID
const getSubcategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Products.findOne({
      where: { id },
      include: [
        {
          model: Subcategory,
          as: "subcategory",
        },
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

//GET PRODUCT WISE GET SUBCATEGORY
async function getProductBySubcategory(req, res) {
  const { subcategory_name } = req.params;
  try {
      const subcat = await Products.findAll({
          include: [
              {
                  model: Subcategory,
                  as:'subcategory',
                  where: {
                    subcategory_name: {
                        [Sequelize.Op.like]: `%${subcategory_name}%`,
                    },
                },
              }
          ],
      });
      if (subcat) {
          res.status(200).json({
              data: subcat
          })
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports=
{
    addSubcategory,
    getAllSubcategory,
    getSubcategoryById,
    getProductBySubcategory,
    getAll
}