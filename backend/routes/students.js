const express = require('express');
const app = express.Router();
const Student = require('../models/student');

const checkAuth = require('../middleware/check-auth');


app.post('', checkAuth, (req, res, next) => {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    semester: req.body.semester,
    entryYear: req.body.entryYear
  });
  student.save().then((result) => {
    res.status(201).json({message: "Student data added successfully", _id: result._id.toString()});
  });
});

app.put("/:id", checkAuth, (req, res, next) => {
  const student = new Student({
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    semester: req.body.semester,
    entryYear: req.body.entryYear
  });
  Student.updateOne({_id: req.params.id}, student).then((result) => {
    console.log(result);
    res.status(200).json({message: 'Update Successful!'});
  })
})

app.get('', checkAuth, (req, res, next) => {
  Student.find()
    .then((documents) => {
      res.status(200).json({
        message: 'Students data fetched successfully',
        students: documents
      });
    });
});

app.get("/:id", checkAuth, (req, res, next) => {
  Student.findById(req.params.id).then((student) => {
    if (student) {
      res.status(200).json({message: 'Found Post', student});
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  })
})

app.delete('/:id', checkAuth, (req, res, next) => {
  Student.deleteOne({_id: req.params.id}).then((result) => {
    res.status(201).json({message: 'Student Data successfully deleted.'});
  });
});

module.exports = app;
