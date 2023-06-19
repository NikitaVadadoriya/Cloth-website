const Media = require('../Modals/MediaModal');
const { Sequelize, where } = require('sequelize');

//ADD IMAGES 
const addImages = async (req, res) => {
    try {
        const pid=req.body.pid
        const imagesPath = req.files.map(file => file.path);
        const images = imagesPath.reduce((acc, path) => {
            return acc ? `${acc},${path}` : path;
          }, null);

        const Images=await Media.create({images,pid})
                return res.status(200).json({ message: 'Images uploaded successfully',data:Images });
    } catch (error) {
        console.log(error)
    }
}

//GET ALL IMAGES 
const getAllImage =async(req,res)=>{
    const id = req.query.id ? req.query.id : req.params.id;
    try {
        const media = await Media.findOne({
            where:{id:id}
        }); // Assuming you have a Media model representing the 'media' table
        
        if (!media) {
          return res.status(404).json({ error: 'No images found' });
        }
        
        const images = media.images.split(',').map((path) => path.trim()); // Split the images string into an array
        return res.status(200).json({ images });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

module.exports =
{
    addImages,
    getAllImage
}