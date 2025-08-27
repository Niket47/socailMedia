const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        // 🔹 Get token from header
        const authHeader = req.headers.authorization;
       
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "No token provided",
                success: false,
            });
        }

        const token = authHeader.split(" ")[1]; // Extract token

        // 🔹 Verify token
        const decoded = jwt.verify(token, "secret");

        // 🔹 Find user
        const user = await User.findById(decoded.id).select("-password"); // don’t expose password
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false,
            });
        }

        req.user = user; // attach user to request
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token",
            success: false,
        });
    }
};

module.exports = authMiddleware;
