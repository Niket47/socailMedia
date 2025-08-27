// import ImageKit from "imagekit";

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const uploadFile = async (file, fileName) => {
    try {
        const response = await imagekit.upload({
            file: file,
            fileName: fileName,
            folder: "social-media",
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = uploadFile