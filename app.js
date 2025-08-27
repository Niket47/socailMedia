const express = require("express")
const app = express()
require('dotenv').config()
const connectDB = require("./src/db/db")
const authRoutes = require("./src/router/auth.routes")
const postRoutes = require("./src/router/post.routes")

express.urlencoded({ extended: true })
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)

connectDB()
const port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})