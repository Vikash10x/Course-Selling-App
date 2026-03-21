const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://vikash:jACg61fzS9JItII4@cluster0.ib0fdeq.mongodb.net/course-app";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));



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



const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);
const listModel = mongoose.model("list", listSchema);

module.exports = {
  userModel,
  courseModel,
  purchaseModel,
  listModel
};
