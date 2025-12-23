const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchaseModel, listModel } = require("../db");
const { authMiddleware } = require("../middleware/auth")
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;


courseRouter.post("/purchase", authMiddleware, async function (req, res) {
    try {
        const userId = req.userId;

        const { courseId } = req.body;
        console.log(courseId);

        if (!courseId) {
            return res.status(400).json({
                message: "courseId is required",
            });
        }

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        const existingPurchase = await purchaseModel.findOne({ userId, courseId });

        if (existingPurchase) {
            return res.status(400).json({
                message: "Course already purchased",
            });
        }

        await purchaseModel.create({
            userId,
            courseId,
        });

        res.status(200).json({
            message: "You have successfully bought the course",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error while purchasing course",
        });
    }
});


courseRouter.get("/preview", async function (req, res) {
    try {
        const courses = await courseModel.find({});
        res.status(200).json({
            courses: courses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching courses",
        });
    }
});

courseRouter.post("/list/:id", authMiddleware, async (req, res) => {
    const courseId = req.params.id;
    const { title, description, learnings, features, details, whoCanJoin } = req.body;
    console.log("LOG: ", req.body);


    const newItem = await listModel.create({
        title,
        description,
        learnings,
        features,
        details,
        whoCanJoin,
        courseId

    });

    res.json({
        message: "List item created",
        item: newItem
    });
});


module.exports = {
    courseRouter: courseRouter
}