const { Router } = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/auth");
const { purchaseModel, courseModel } = require("../db");

const paymentRouter = Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

// Step 1: Create a Razorpay order
paymentRouter.post("/create-order", authMiddleware, async (req, res) => {
    try {
        const { courseId } = req.body;

        // Fetch the course to get the price
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }

        // Check if already purchased
        const alreadyPurchased = await purchaseModel.findOne({
            userId: req.user.id,
            courseId,
        });
        if (alreadyPurchased) {
            return res.status(400).json({ success: false, message: "Course already purchased" });
        }

        // Create Razorpay order (amount must be in paise — multiply by 100)
        const options = {
            amount: Math.round(Number(course.price) * 100),
            currency: "INR",
            receipt: `rcpt_${Date.now()}`.slice(0, 40), // max 40 chars
        };

        console.log("Creating Razorpay order with options:", options);
        console.log("Using Razorpay Key ID:", RAZORPAY_KEY_ID);

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            courseName: course.title,
            keyId: RAZORPAY_KEY_ID,
        });
    } catch (err) {
        console.error("Create order error FULL:", JSON.stringify(err, null, 2));
        res.status(500).json({
            success: false,
            message: "Failed to create payment order",
            error: err.message,
            details: err.error || err.description || null
        });
    }
});

// Step 2: Verify payment signature and save purchase
paymentRouter.post("/verify", authMiddleware, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

        // Verify signature using HMAC SHA256
        const generatedSignature = crypto
            .createHmac("sha256", RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Save purchase to DB
        await purchaseModel.create({
            userId: req.user.id,
            courseId,
        });

        res.json({
            success: true,
            message: "Payment verified and course purchased successfully",
        });
    } catch (err) {
        console.error("Verify payment error:", err);
        res.status(500).json({ success: false, message: "Verification failed", error: err.message });
    }
});

module.exports = { paymentRouter };
