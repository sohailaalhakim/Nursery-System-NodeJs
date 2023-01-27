"use strict";

var jwt = require("jsonwebtoken");

exports.login = function (request, response, next) {
  var token; //for admin

  if (request.body.userName == "sohaila" && request.body.password == 12345) {
    token = jwt.sign({
      role: "admin",
      userName: "eman"
    }, "NodeJsSecretKey", {
      expiresIn: "2h"
    });
    response.status(200).json({
      message: "logged In",
      token: token
    });
  } else {
    var error = new Error("Not Authenticated");
  }
};