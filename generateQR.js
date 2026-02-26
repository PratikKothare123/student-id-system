const XLSX = require("xlsx");
const QRCode = require("qrcode");
const fs = require("fs");

// your deployed website URL
const BASE_URL = "https://student-id-system-6q8b.onrender.com/student/";

// read excel
const workbook = XLSX.readFile("students.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const students = XLSX.utils.sheet_to_json(sheet);

// create qr folder
if (!fs.existsSync("qr")) {
  fs.mkdirSync("qr");
}

async function generateQR() {

  for (const student of students) {

    const pen = student.pen.toString();

    const url = BASE_URL + pen;

    await QRCode.toFile(`qr/${pen}.png`, url);

    // add qr path to excel data
    student.qr_image = `qr/${pen}.png`;
  }

  // create new excel with QR column
  const newSheet = XLSX.utils.json_to_sheet(students);
  const newWorkbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Students");

  XLSX.writeFile(newWorkbook, "students_with_qr.xlsx");

  console.log("✅ QR Generated + Excel Created");
}

generateQR();