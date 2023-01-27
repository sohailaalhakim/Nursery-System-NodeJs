"use strict";

var express = require("express");

var router = express.Router();

var _require = require("express-validator"),
    body = _require.body,
    query = _require.query,
    param = _require.param,
    validationResult = _require.validationResult;

var controller = require("./../Controller/class");

var validator = require("./../Middlewares/errorValidation");

var validationObject = require("./../Middlewares/classValidationObject");

router.route("/class").get(controller.getAllClasses).post(validationObject, validator, controller.addNewClass).patch(validationObject, validator, controller.updateClassData)["delete"](validationObject, validator, controller.deleteClass);
router.route("/class/:id").get(param("id").isInt().withMessage("Id search must be integr"), controller.getClassById)["delete"](controller.deleteClassByID);
router.route("/classchildern/:id").get(controller.getClassChildern);
router.route("/classteacher/:id").get(controller.getClassTeacher);
module.exports = router; // param("id").isInt().withMessage("Id must be integr"),