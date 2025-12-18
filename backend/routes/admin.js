const { Router } = require("express");
const adminRouter = Router();
const { purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/auth");

adminRouter.post("/course", authMiddleware, async function (req, res) {
    try {
        const adminId = req.user.id;

        const { title, description, price, images } = req.body;

        if (!title || !description || !price) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const course = await courseModel.create({
            title,
            description,
            price,
            creatorId: adminId,
        });

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id,
        });

    } catch (error) {
        console.error("Create course error:", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});


adminRouter.get("/course", async (req, res) => {
    const courses = await courseModel.find({
        // creatorId: req.user.id
    });

    res.json({
        message: "Your created courses",
        courses
    });
});

adminRouter.delete("/delete/:id", authMiddleware, async function (req, res) {
    // if (req.user.role !== "admin") {
    //     return res.status(403).json({
    //         success: false,
    //         message: "Only admins can delete courses"
    //     });
    // }

    try {
        const courseId = req.params.id;

        const course = await courseModel.findById(courseId);
        console.log("Course: ", course);


        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        await courseModel.findByIdAndDelete(courseId);

        // await purchaseModel.deleteMany({ courseId });

        res.json({
            success: true,
            message: "Course deleted successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
});

module.exports = {
    adminRouter: adminRouter
}