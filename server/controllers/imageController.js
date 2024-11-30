const asyncHandler = require('express-async-handler');
const Image = require('../models/imageModel');

const checkImage = asyncHandler(async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);

        const {image, time} = req.body;

        if (!image || !time) {
            res.status(400).json({message: "Image and time data is required"});
            return;
        }

        // convert base64 to buffer
        // const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
        // const imageBuffer = Buffer.from(base64Data, "base64");

        const imgResponse = await Image.create({image, time, likes: 0, stars: 3});

        const io = req.app.get('io');
        io.emit('new-image', imgResponse);

        res.status(201).json({message: "Image processed successfully", data: image.length});
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({message: "Failed to process the image", error: error.message});
    }
});

const getImages = asyncHandler(async (req, res) => {
    try {
        const images = await Image.find()
            .sort({createdAt: -1}) // Sort by creation date in descending order (latest first)
            .limit(20); // Limit the result to the latest 20 entries

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({message: error.message, error: error.message});
    }
});


module.exports = {checkImage, getImages};