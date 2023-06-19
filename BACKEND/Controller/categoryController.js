const Category =require('../Modals/categoryModal');
const Products = require('../Modals/productModal');
const { Joi }=require('express-validation')

//ADD CATEGORY
const addCategory =async(req,res)=>{
    try {
        const validationSchema = Joi.object().keys({
            category_name: Joi.string().required(),
            image: Joi.required(),
            
        })
        req.body.image=req.file
        const validate = validationSchema.validate(req.body);
        if (validate.error) {
            return res.status(412).json({
                status: 412,
                message: validate.error.details[0].message
            })
        }
        const category = await Category.create({
            category_name: req.body.category_name,
            image: req.file.path,
        });

        return res.status(200).json({
            status: 200,
            message: "category added successfully",
            data: category,
        });
    } catch (error) {
        return res.status(412).json({
            status: 412,
            message: error.message,
        });
    }
}

//GET ALL CATEGORY
const getAllCategory = async (req, res) => {
    try {
        let category = await Category.findAll({});
        res.status(200).send(category);
    } catch (error) {
        console.log(error)
    }
}


module.exports=
{
    addCategory,
    getAllCategory
}