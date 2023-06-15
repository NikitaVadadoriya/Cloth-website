const Stoke =require('../Modals/stokeModal');


const addStoke =async(req,res)=>{
    try {
        const info={
            quantity:req.body.quantity,
            sku:req.body.sku,
            pid:req.body.pid
        }
    
        const variant =await Stoke.create(info)
        if(variant){
            res.status(200).json({
                status:200,
                message:" Stoke inserted..."
            })
        }
    } catch (error) {
        console.log(error)
    }
   
}


module.exports=
{
    addStoke
}