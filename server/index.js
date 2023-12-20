const express = require('express');
const fs = require('fs');
const jimp = require('jimp');

const app = express();
const port = 5000;

app.use(express.static('public'));

app.get('/images', async (req, res) => {
    const imagesPath = './images';
    const images = fs.readdirSync(imagesPath);3  

    const imageList = [];

    for (const image of images) {
        const imagePath = `${imagesPath}/${image}`;

        try {
            const imageBuffer = fs.readFileSync(imagePath);

            const jimpImage = await jimp.read(imageBuffer);
            
            // Resize the image to 200x200
            jimpImage.resize(200, 200);

            // Convert the image to a buffer
            const processedImage = await jimpImage.getBufferAsync(jimp.AUTO);

            imageList.push({
                name: image,
                processedImage: processedImage,
                preview: imageBuffer.toString('base64'),
            });
        } catch (error) {
            console.error(`Error processing image ${image}:`, error);
        }
    }

    res.send(imageList);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
