const postModel = require("../models/post.model")
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid")

const createPost = async (req, res) => {
    try {
        const file = req.file

        const base64 = new Buffer.from(file.buffer).toString('base64');

        const captionText = await generateCaption(base64)
        console.log(captionText)

        const resultUrl = await uploadFile(file.buffer, `name-${uuidv4()}`)
        console.log(resultUrl)

        return res.status(201).json({
            message: "success",
            success: true,
            data: {
                url: resultUrl?.url,
                caption: captionText
            }
        })

    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = { createPost }