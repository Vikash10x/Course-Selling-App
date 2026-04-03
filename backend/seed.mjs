import mongoose from 'mongoose';

// Replace with your real connection string if MONGODB_URI is not set
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://vikash:jACg61fzS9JItII4@cluster0.ib0fdeq.mongodb.net/course-app";

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: { type: Boolean, default: true },
});

const Course = mongoose.model('course', courseSchema);

const courses = [
    {
        title: "Full-Stack MERN Mastery",
        description: "Master React, Node.js, Express, and MongoDB with real-world projects. Build scalesble web applications from scratch.",
        price: 499,
        imageLink: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Python for Data Science",
        description: "Learn Python for data analysis, visualization, and machine learning. Includes Pandas, NumPy, and Scikit-Learn.",
        price: 399,
        imageLink: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Mastering UI/UX with Figma",
        description: "Modern design principles, user psychology, and interactive prototyping in Figma for designers and developers.",
        price: 299,
        imageLink: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "DevOps & Cloud Computing",
        description: "A comprehensive guide to Docker, Kubernetes, CI/CD pipelines, and AWS deployment for senior developers.",
        price: 599,
        imageLink: "https://images.unsplash.com/photo-1667372333374-c820118b93f0?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Mobile App Dev with Flutter",
        description: "Build beautiful, high-performance cross-platform apps for iOS and Android using Google's Flutter framework.",
        price: 449,
        imageLink: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "The Complete Java Bootcamp",
        description: "Enterprise-level programming with Java. Algorithms, data structures, and Spring Boot for backend engineering.",
        price: 349,
        imageLink: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    }
];

async function seedDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing courses
        await Course.deleteMany({});
        console.log("Existing courses cleared!");

        // Insert new courses
        await Course.insertMany(courses);
        console.log("Professional courses seeded successfully! 🚀");

        process.exit();
    } catch (err) {
        console.error("Seeding Error:", err);
        process.exit(1);
    }
}

seedDB();
