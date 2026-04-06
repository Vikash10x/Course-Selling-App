const mongoose = require('mongoose');

// Use the same URI from your db.js
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://vikash:jACg61fzS9JItII4@cluster0.ib0fdeq.mongodb.net/course-app";

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    videoUrl: String,
    published: { type: Boolean, default: true },
});

// Avoid "OverwriteModelError" if model already exists
const Course = mongoose.models.course || mongoose.model('course', courseSchema);

const courses = [
    {
        title: "Full-Stack MERN Mastery 2024",
        description: "Master React, Node.js, Express, and MongoDB with real-world projects. Build scalable web applications from scratch.",
        price: 499,
        imageLink: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M"
    },
    {
        title: "Python for Data Science Bootcamp",
        description: "Learn Python for data analysis, visualization, and machine learning. Includes Pandas, NumPy, and Scikit-Learn.",
        price: 399,
        imageLink: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw"
    },
    {
        title: "Mastering UI/UX with Figma",
        description: "Modern design principles, user psychology, and interactive prototyping in Figma for designers and developers.",
        price: 299,
        imageLink: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=3m0TXas0Vjw"
    },
    {
        title: "DevOps: Docker & Kubernetes Masterclass",
        description: "A comprehensive guide to Docker, Kubernetes, CI/CD pipelines, and AWS deployment for backend developers.",
        price: 599,
        imageLink: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=hQcFE0RD0cQ"
    },
    {
        title: "Next.js 14 Ultimate Guide",
        description: "Build production-ready apps using App Router, Server Actions, and advanced performance patterns with Next.js 14.",
        price: 449,
        imageLink: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=wm5gMKuwSYk"
    },
    {
        title: "Deep Learning & Neutral Networks",
        description: "Dive deep into AI with TensorFlow and Keras. Learn to build and train sophisticated deep learning models.",
        price: 699,
        imageLink: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?q=80&w=2070&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/watch?v=6M5VXapfT20"
    }
];


async function seedDB() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected successfully!");

        // Clear existing courses
        await Course.deleteMany({});
        console.log("Existing courses cleared!");

        // Insert new courses
        await Course.insertMany(courses);
        console.log("Professional courses with videos seeded successfully! 🚀");

        process.exit();
    } catch (err) {
        console.error("Seeding Error:", err);
        process.exit(1);
    }
}

seedDB();
