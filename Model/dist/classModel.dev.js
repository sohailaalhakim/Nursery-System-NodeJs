"use strict";

var mongoose = require("mongoose");

var AutoIncrement = require('mongoose-sequence')(mongoose);

var ClassSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String
  },
  teachers: {
    type: mongoose.Types.ObjectId,
    ref: "teachers"
  },
  childern: [{
    type: Number,
    ref: "childern"
  }]
}, {
  _id: false
});
ClassSchema.plugin(AutoIncrement, {
  id: 'class_id_counter'
});
mongoose.model("classes", ClassSchema);