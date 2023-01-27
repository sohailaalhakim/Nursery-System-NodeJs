"use strict";

var _require = require("express-validator"),
    body = _require.body,
    query = _require.query,
    param = _require.param,
    validationResult = _require.validationResult;

module.exports = [body("fullName").isString().withMessage("Name must be in chars format").isLength({
  max: 50
}), body("age").isInt({
  min: 2,
  max: 5
}).withMessage("min age 2 and max age for nursery is 5 "), body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("level should be in(PreKG,KG1,KG2)"), body("address").isObject().withMessage("Address  must be a object"), body("address.city").isString().withMessage("City should be a string"), body("address.street").isString().withMessage("Street should be a string"), body("address.building").isNumeric().withMessage("Building should be a string")];