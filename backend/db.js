const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://vikash:jACg61fzS9JItII4@cluster0.ib0fdeq.mongodb.net/course-app";

console.log("Connecting to MongoDB...");
mongoose.connect(MONGODB_URI)
  .then(() => {
    const dbName = mongoose.connection.name;
    const host = mongoose.connection.host;
    console.log(`✅ MongoDB Connected to database: ${dbName} at ${host}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit if DB connection fails in production
  });



const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});


const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  videoUrl: { type: String, default: "" },
  published: Boolean,
});


const listSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course"
  }
});


const purchaseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
});

const ratingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// One rating per user per course
ratingSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);
const listModel = mongoose.model("list", listSchema);
const ratingModel = mongoose.model("rating", ratingSchema);

module.exports = {
  userModel,
  courseModel,
  purchaseModel,
  listModel,
  ratingModel,
};
