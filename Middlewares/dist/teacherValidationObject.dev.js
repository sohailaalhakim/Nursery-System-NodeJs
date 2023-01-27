"use strict";

var _require = require("express-validator"),
    body = _require.body,
    query = _require.query,
    param = _require.param,
    validationResult = _require.validationResult;

module.exports = [body("_id").isMongoId().withMessage(""), body("fullname").isString().withMessage("Name must be string"), body("password").isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1
}).withMessage("Password should be combination of uppercase,lower case,special chars,digits and min 8 , max 20 char long"), body("email").isEmail().withMessage("Email must be in format @example.com"), body("image").isString().withMessage("Image must in string path")];