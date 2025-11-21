const { Router } = require("express");
const adminRouter = Router();
const { purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/auth");

adminRouter.post("/course", authMiddleware, async function (req, res) {
    // console.log(adminMiddleware);
    const adminId = req.user.id;
    const role = req.user.role;
    console.log(role);

    if (role !== "admin") {
        res.json({
            message: "Only Admins are allowed to create courses. "
        })
    }
    else {
        const { title, description, price } = req.body;

        const course = await courseModel.create({
            title: title,
            description: description,
            price: price,
            creatorId: adminId
        })

        res.json({
            message: "course created successfully",
            courseId: course._id
        })
    }

})

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