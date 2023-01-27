"use strict";

var _require = require("express"),
    request = _require.request,
    response = _require.response;

var express = require("express");

var _require2 = require("express-validator"),
    body = _require2.body;

var mongoose = require("mongoose");

require("./../Model/classModel");

var ClassSchema = mongoose.model("classes"); // exports.getAllClasses=(request,response,next)=>{
//     ClassSchema.find({})
//                .then((data)=>{
//                 response.status(200).json({message:"List of Classes",data});
//                })
//                .catch(error=>{next(error)})
// }

exports.getAllClasses = function (request, response, next) {
  ClassSchema.find().populate({
    path: "teachers",
    select: "fullname"
  }).populate({
    path: "childern",
    select: "fullName"
  }).then(function (data) {
    response.status(200).json({
      message: "List of Classes",
      data: data
    });
  })["catch"](function (error) {
    next(error);
  });
}; //--------------------------------------------------------------------------


exports.getClassById = function (request, response, next) {
  ClassSchema.findById(request.params.id).then(function (data) {
    if (data != null) {
      response.status(200).json({
        message: "The Child:",
        data: data
      });
    } else {
      throw new Error("Class is not found");
    }
  })["catch"](function (error) {
    next(error);
  });
}; //---------------------------------------------------------------------------


exports.addNewClass = function (request, response, next) {
  var newClass = new ClassSchema({
    _id: request.body.id,
    name: request.body.name,
    teachers: request.body.supervisor,
    childern: request.body.childId
  });
  newClass.save().then(function (result) {
    response.status(200).json({
      message: "Class added successfully ",
      result: result
    });
  })["catch"](function (error) {
    next(error);
  });
}; //---------------------------------------------------------------------------


exports.updateClassData = function (request, response, next) {
  ClassSchema.updateOne({
    _id: request.body._id
  }, {
    $set: {
      name: request.body.name // supervisor: request.body.supervisor,
      // childId: request.body.childId,

    }
  }).then(function (result) {
    if (result.modifiedCount == 0) //if user update child is not exist
      throw new Error("Class is not found");
    response.status(200).json({
      message: "Class updated successfully",
      result: result
    });
  })["catch"](function (error) {
    next(error);
  });
}; //---------------------------------------------------------------------------


exports.deleteClass = function (request, response, next) {
  ClassSchema.deleteOne({
    _id: request.body._id
  }, {}) //    console.log(_id)
  .then(function (result) {
    response.status(200).json({
      message: "Class Deleted successfully",
      result: result
    });
  })["catch"](function (error) {
    next(error);
  });
}; //---------------------------------------------------------------------------


exports.deleteClassByID = function (request, response, next) {
  ClassSchema.findByIdAndDelete(request.params.id).then(function (result) {
    if (result != null) {
      response.status(200).json({
        "message": "This Class is deleted"
      });
    } else {
      throw new Error("This Class is not exist");
    }
  })["catch"](function (error) {
    return next(error);
  });
}; //---------------------------------------------------------------------------


exports.getClassChildern = function (request, response, next) {
  ClassSchema.findOne({
    _id: request.params.id
  }).populate({
    path: "childern",
    select: "_id"
  }).then(function (data) {
    {
      response.status(200).json({
        message: "response.Status(200)"
      });
    } // if(data!=null){ response.status(200).json(data.childId)}
    // else{
    //     throw new Error("This Class is not exist");
    // }
  })["catch"](function (error) {
    next(error);
  });
}; //---------------------------------------------------------------------------


exports.getClassTeacher = function (request, response, next) {
  ClassSchema.findOne({
    _id: request.params.id
  }).populate({
    path: "teachers",
    select: "fullname"
  }).then(function (data) {
    {
      response.status(200).json({
        message: "response.Status(200)"
      });
    } // if(data!=null){ response.status(200).json(data.childId)}
    // else{
    //     throw new Error("This Class is not exist");
    // }
  })["catch"](function (error) {
    next(error);
  });
};