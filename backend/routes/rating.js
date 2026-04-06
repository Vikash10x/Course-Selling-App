const { Router } = require("express");
const { ratingModel, purchaseModel } = require("../db");
const { authMiddleware } = require("../middleware/auth");

const ratingRouter = Router();

// POST /rating — submit or update a rating (only purchased users)
ratingRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId, rating, review } = req.body;

        if (!courseId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Invalid rating data" });
        }

        // Check if user has purchased the course
        const hasPurchased = await purchaseModel.findOne({ userId, courseId });
        if (!hasPurchased) {
            return res.status(403).json({ success: false, message: "You must purchase this course before rating it" });
        }

        // Upsert — update if already rated, create if not
        const existingRating = await ratingModel.findOneAndUpdate(
            { userId, courseId },
            { rating, review: review || "" },
            { new: true, upsert: true }
        );

        res.json({ success: true, message: "Rating submitted", rating: existingRating });
    } catch (err) {
        console.error("Rating error:", err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

// GET /rating/:courseId — get all ratings + average for a course
ratingRouter.get("/:courseId", async (req, res) => {
    try {
        const { courseId } = req.params;

        const ratings = await ratingModel
            .find({ courseId })
            .populate("userId", "name");

        const average =
            ratings.length > 0
                ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
                : null;

        res.json({
            success: true,
            ratings,
            average: average ? parseFloat(average) : null,
            totalRatings: ratings.length,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

// GET /rating/:courseId/my — get the logged-in user's rating for a course
ratingRouter.get("/:courseId/my", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.params;

        const myRating = await ratingModel.findOne({ userId, courseId });
        res.json({ success: true, myRating: myRating || null });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

module.exports = { ratingRouter };
