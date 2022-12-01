const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  phoneNo: {type: String, required: true},
  birthDate: {type: String, required: true},
  gender: {type: String, required: true},
  semester: {type: String, required: true},
  entryYear: {type: String, required: true},
});

module.exports = mongoose.model('Student', studentSchema);
