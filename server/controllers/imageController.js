const asyncHandler = require('express-async-handler');

const checkImage = asyncHandler(async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);

        const {image} = req.body;

        if (!image) {
            res.status(400).json({message: "Image data is required"});
            return;
        }

        const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, "base64");

        console.log("Decoded Image Buffer:", imageBuffer);

        res.status(201).json({message: "Image processed successfully", data: imageBuffer.length});
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({message: "Failed to process the image", error: error.message});
    }
});

module.exports = checkImage;
