"use strict";

var express = require("express");

var _require = require("./teacherRoute"),
    route = _require.route;

var router = express.Router();

var controller = require("./../Controller/login");

router.route("/login").post(controller.login);
module.exports = router;