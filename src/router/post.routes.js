const express = require("express")
const { createPost } = require("../controller/post.controller")
const router = express.Router()
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });


// router.post("/createpost", authMiddleware, upload.single("image"), createPost)
router.post("/createpost", upload.single("image"), createPost)


module.exports = router