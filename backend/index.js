const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { paymentRouter } = require("./routes/payment");
const { ratingRouter } = require("./routes/rating");
const { authMiddleware } = require("./middleware/auth");
const { courseModel } = require("./db")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({ message: "hello" })
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/rating", ratingRouter);


// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// adminRouter.post(
//   "/course",
//   authMiddleware,
//   upload.single("image"),
//   async (req, res) => {

//     console.log(req.body);

//     // res.json({ course });
//   });




const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

