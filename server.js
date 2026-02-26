require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected ✅");
})
.catch((err) => {
  console.log(err);
});
//

// view engine
app.set("view engine", "ejs");

// static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
const studentRoutes = require("./routes/student");
app.use("/student", studentRoutes);

// home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});