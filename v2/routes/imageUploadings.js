const express = require('express');
const router  = express.Router();

const {Make, validate} = require('../models/make')
const cloudinary = require("./utils/cloudinary")

//post
router.use('/uploadimages',upload.array('image'), async (req, res)=>{
    const uploader = async(path) => await cloudinary.uploads(path, 'Images')
    if(req.method ==='POST'){
        const urls = []

        const files = req.files
        for(const file of files){
            const {path} = file
            const newPath = await uploader(path)
        
            urls.push(newPath)

            fs.unlinkSync(path)
        }
        res.status(200).json({
            message:"Images uploaded successfuly",
            data:urls
        })
 
    } else{
        res.status(405).json({
            err:" Images not uploaded succeefully"
        })
    }
})
//single image
router.use('/uploadimage',upload.single('image'), async (req, res)=>{
    const uploader = async(path) => await cloudinary.uploads(path, 'Images')
    if(req.method ==='POST'){
        const urls = []

        const files = req.files
        for(const file of files){
            const {path} = file
            const newPath = await uploader(path)
        
            urls.push(newPath)

            fs.unlinkSync(path)
        }
        res.status(200).json({
            message:"Images uploaded successfuly",
            data:urls
        })
 
    } else{
        res.status(405).json({
            err:" Images not uploaded succeefully"
        })
    }
})




module.exports= router;