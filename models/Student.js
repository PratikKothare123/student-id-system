const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  pen: String,
  name: String,
  gender: String,
  father_name: String,
  mother_name: String,
  class: String,
  section: String,
  category: String,
  mobile: String,
  minority_group: String,
  bpl: String,
  cwsn: String,
  impairment_type: String,
  is_repeater: String,
  aadhaar_no: String
});

module.exports = mongoose.model("Student", studentSchema);