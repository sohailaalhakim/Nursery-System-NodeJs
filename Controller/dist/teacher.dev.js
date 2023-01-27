"use strict";

var _require = require("express"),
    request = _require.request,
    response = _require.response;

var Teacher = require("./../Model/teachersModel");

var mongoose = require("mongoose");

var TeacherSchema = mongoose.model("teachers");

exports.getAllTeachers = function (request, response, next) {
  TeacherSchema.find({}).then(function (data) {
    response.status(200).json({
      message: "List of Teachers",
      data: data
    });
    console.log("params", request.params);
  })["catch"](function (error) {
    next(error);
  });
}; //---------------------------------------------------------


exports.addNewTeacher = function (request, response, next) {
  var newTeacher = new TeacherSchema({
    // _id: mongoose.Types.ObjectId(),
    fullname: request.body.fullname,
    password: request.body.password,
    email: request.body.email,
    image: request.body.image
  });
  newTeacher.save().then(function (result) {
    response.status(200).json({
      message: "Teacher Added Done successfully",
      result: result
    });
    console.log("body", request.body);
  })["catch"](function (error) {
    next(error);
  });
}; //-------------------------------------------------------------


exports.updateTeacherData = function (request, response, next) {
  TeacherSchema.updateOne({
    _id: request.body._id
  }, {
    $set: {
      fullname: request.body.fullname // password:request.body.password,
      // email:request.body.email,
      // image:request.body.image,

    }
  }).then(function (result) {
    if (result.matchedCount == 0) {
      throw new Error("This teacher is not found");
    } else {
      response.status(200).json({
        message: "Teacher Updating done successfully",
        result: result
      });
    }
  })["catch"](function (error) {
    next(error);
  });
}; //----------------------------------------------------------------


exports.deleteTeacher = function (request, response, next) {
  TeacherSchema.findByIdAndDelete({
    _id: mongoose.Types.ObjectId(request.body._id)
  }, {}).then(function (result) {
    if (result != null) {
      response.status(200).json({
        message: "Teacher Deleted done successfully",
        result: result
      });
    } else {
      throw new Error("This teacher is not exist");
    }
  })["catch"](function (error) {
    next(error);
  });
}; //----------------------------------------------------------------------