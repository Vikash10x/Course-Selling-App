const { Router } = require("express");
const mongoose = require("mongoose");

const userRouter = Router();
const { userModel, purchaseModel, listModel, courseModel, ratingModel } = require("../db");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware/auth");
const { JWT_SECRET } = require("../config");

userRouter.post("/signup", async function (req, res) {
    const { name, email, password, role } = req.body;

    const existUser = await userModel.findOne({ email: email });

    if (existUser) {
        return res.status(400).json({
            message: "You have already login from this email",
        });
    }

    const user = await userModel.create({
        name: name,
        email: email,
        password: password,
        role: role || "user"
    });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.json({
        message: "SignUp Successful",
        token: token,
        role: user.role
    });

})

userRouter.post("/signin", async function (req, res) {
    try {
        const { email, password } = req.body;
        console.log("Signin attempt for:", email);

        const user = await userModel.findOne({
            email: email,
        });

        if (user && user.password === password) {
            const token = jwt.sign({
                id: user._id,
                role: user.role
            }, JWT_SECRET, { expiresIn: "2h" });

            res.json({
                message: "Signin successful",
                token: token,
                role: user.role
            });
        } else if (user && user.password !== password) {
            res.status(403).json({
                message: "Password is incorrect"
            });
        } else {
            res.status(400).json({
                message: "No account present from this email"
            });
        }
    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({
            message: "Internal server error during signin",
            error: error.message
        });
    }
});

userRouter.post("/purchase", authMiddleware, async function (req, res) {
    const { courseId } = req.body;
    const userId = req.user.id;

    await purchaseModel.create({
        userId,
        courseId
    });

    res.json({
        success: true,
        message: "Course Purchase Successfully"
    });
});


userRouter.get("/my-course", authMiddleware, async (req, res) => {
    const userId = req.user.id;
    console.log("ID is: ", userId);


    const purchases = await purchaseModel
        .find({ userId })
        .populate("courseId");   // 👈 VERY IMPORTANT


    res.json({
        success: true,
        purchases,
    });
});


userRouter.get("/list/:id", authMiddleware, async function (req, res) {
    const courseId = req.params.id;

    try {
        const course = await courseModel.findById(courseId);
        const list = course ? [course] : [];

        console.log("Fetched Course Details:", list);

        res.json({
            success: true,
            list
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e.message,
        });
    }
});


userRouter.get("/profile", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const purchases = await purchaseModel
            .find({ userId })
            .populate("courseId");

        res.json({
            success: true,
            user,
            purchases,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

module.exports = {
    userRouter
}