const { Router } = require("express");

const userRouter = Router();
const { userModel, purchaseModel, listModel } = require("../db");
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
    })

    res.json({
        message: "SignUp Successful",
        user
    })


})

userRouter.post("/signin", async function (req, res) {

    const { email, password } = req.body;
    // console.log(email, password);

    const user = await userModel.findOne({
        email: email,
    })
    if (user && user.password === password) {
        const token = jwt.sign({
            id: user._id, role: user.role
        }, JWT_SECRET, { expiresIn: "2h" });

        console.log(token);
        res.json({
            message: "Signin successful",
            token: token,
            role: user.role
        })
    } else if (user && user.password !== password) {
        res.status(403).json({
            message: "Password is incorreect"
        })
    } else {
        res.status(400).json({
            message: "No account present from this email"
        })
    }
})

userRouter.post("/purchase", authMiddleware, async function (req, res) {

    const { courseId } = req.body;
    console.log("CourseId: ", courseId);

    const userId = req.user.id;

    try {
        await purchaseModel.create({
            userId,
            courseId
        })

        res.json({
            success: true,
            message: "Course Purchase Successfully"
        })
    } catch (e) {
        res.json({
            success: false,
            message: "Something went Wrong",
            Error: e.message
        })

    }
})

userRouter.get("/my-course", authMiddleware, async function (req, res) {
    const userId = req.user.id;

    try {
        const purchases = await purchaseModel.find({
            userId,
        })
            .populate("courseId");
        res.json({
            success: true,
            purchases
        })
    } catch (e) {
        res.json({
            success: false,
            message: "Something went wrong",
            Error: e.message
        })
    }
})

userRouter.post("/list", authMiddleware, async function (req, res) {
    // const courseId = req.body;

    const { title, description, courseId } = req.body;

    try {
        await listModel.create({
            title,
            description,
            courseId
        })
        res.json({
            message: "list successful: "
        })
    } catch (e) {
        res.json({
            message: "Something went wrong",
            Error: e.message
        })
    }

})
module.exports = {
    userRouter
}