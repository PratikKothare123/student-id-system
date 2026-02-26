const mongoose = require("mongoose");
const XLSX = require("xlsx");
const Student = require("./models/Student");

// connect database
mongoose.connect("mongodb+srv://kotharepratik129_db_user:V4XMVxTXa9c4FQX6@cluster0.tzauzme.mongodb.net/school")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// read excel
const workbook = XLSX.readFile("students.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const students = XLSX.utils.sheet_to_json(sheet);

async function importStudents() {
  try {
    await Student.insertMany(students);
    console.log("Students Imported Successfully ✅");
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

importStudents();