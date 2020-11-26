const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const Csmp = require("../models/csmp");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.post("/", upload.single('ImageFile'), (req, res, next) => {
  const product = new Csmp({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    ImageFile: req.file.path 
  });

  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "File successfully Uploaded"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
