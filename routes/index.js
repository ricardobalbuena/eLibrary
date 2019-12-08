const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Employee = require('../models/employee.model');
const mongoose = require('mongoose');
// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);





///////////////////////////////////////////////////

router.get('/', (req, res) => {
  res.render("/views/addOrEdit", {
      viewTitle: "Insert Employee"
  });
});

router.post('/', (req, res) => {
  if (req.body._id == '')
      insertRecord(req, res);
      else
      updateRecord(req, res);
});


function insertRecord(req, res) {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
      if (!err)
          res.redirect('/dashboard');
      else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              res.render("views/addOrEdit", {
                  viewTitle: "Insert Employee",
                  employee: req.body
              });
          }
          else
              console.log('Error during record insertion : ' + err);
      }
  });
}

function updateRecord(req, res) {
  Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if (!err) { res.redirect('views/dashboard'); }
      else {
          if (err.name == 'ValidationError') {
              handleValidationError(err, req.body);
              res.render("views/addOrEdit", {
                  viewTitle: 'Update Employee',
                  employee: req.body
              });
          }
          else
              console.log('Error during record update : ' + err);
      }
  });
}


router.get('/dashboard', (req, res) => {
  Employee.find((err, docs) => {
      if (!err) {
          res.render("views/dashboard", {
              list: docs
          });
      }
      else {
          console.log('Error in retrieving employee list :' + err);
      }
  });
});


function handleValidationError(err, body) {
  for (field in err.errors) {
      switch (err.errors[field].path) {
          case 'fullName':
              body['fullNameError'] = err.errors[field].message;
              break;
          case 'email':
              body['emailError'] = err.errors[field].message;
              break;
          default:
              break;
      }
  }
}

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
      if (!err) {
          res.render("/views/addOrEdit", {
              viewTitle: "Update Employee",
              employee: doc
          });
      }
  });
});

router.get('/delete/:id', (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/views/dashboard');
      }
      else { console.log('Error in employee delete :' + err); }
  });
});


module.exports = router;
