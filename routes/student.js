const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// dynamic student page
router.get("/:pen", async (req, res) => {

  try {
    const studentPen = req.params.pen;

    // find student in database
    const student = await Student.findOne({ pen: studentPen });

    if (!student) {
      return res.send("Student not found");
    }

    res.render("student", { student });

  } catch (err) {
    console.log(err);
    res.send("Error loading student");
  }

});

module.exports = router;