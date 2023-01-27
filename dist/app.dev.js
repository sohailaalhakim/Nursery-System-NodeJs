"use strict";

var express = require("express");

var morgan = require("morgan");

var app = express();

var teacherRouter = require("./Routes/teacherRoute");

var childRouter = require("./Routes/childRouter");

var classRouter = require("./Routes/classRouter");

var mongoose = require("mongoose");

var login = require("./Routes/loginRoute"); // app.use(morgan("common")); //common, tiny, combined, dev, short


var port = process.env.PORT || 8080; //set DB connection

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/nurseryDB").then(function () {
  console.log("DB Connected");
  app.listen(port, function () {
    console.log("Server listening on port: 8080.....");
  });
})["catch"](function (error) {
  console.log("DB Problem " + error);
}); //first middleware using morgan 

app.get('/', function (request, response, next) {
  response.send('hello from first middleWare'), next();
}); // app.use(morgan(':method :url :status')); //using format string of perdefined tokens

app.use(express.json());
app.use(login);
app.use(teacherRouter);
app.use(childRouter);
app.use(classRouter); //General middleware for not Found url pathes with 404 status code

app.use(function (request, response, next) {
  response.status(404).json({
    data: "Not Found"
  });
}); //Error handling middleware

app.use(function (error, request, response, next) {
  response.status(500).json({
    message: "Error" + error
  });
});