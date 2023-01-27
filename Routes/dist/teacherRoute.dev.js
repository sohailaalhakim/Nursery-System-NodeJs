"use strict";

var express = require("express");

var router = express.Router();

var controller = require("./../Controller/teacher");

var _require = require("express-validator"),
    body = _require.body,
    query = _require.query,
    param = _require.param,
    validationResult = _require.validationResult;

var validator = require("./../Middlewares/errorValidation");

var validationObject = require("./../Middlewares/teacherValidationObject");

router.route("/teachers").get(controller.getAllTeachers).post(controller.addNewTeacher).patch(controller.updateTeacherData)["delete"](validationObject, validator, controller.deleteTeacher);
module.exports = router;