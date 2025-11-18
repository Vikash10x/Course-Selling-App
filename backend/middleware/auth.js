const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("authheader: ", authHeader);

    if (!authHeader) {
        return res.status(403).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log("Decoded token:", decoded);

        req.user = decoded;
        next();

    } catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
}
// console.log("authMiddleware type:", typeof authMiddleware);


module.exports = { authMiddleware };
