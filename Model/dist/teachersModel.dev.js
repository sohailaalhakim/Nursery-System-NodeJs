"use strict";

var mongoose = require("mongoose");

var ObjectId = require("mongo-objectid");

var TeacherSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true
  },
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  image: {
    type: String,
    required: true
  }
});
mongoose.model("teachers", TeacherSchema);