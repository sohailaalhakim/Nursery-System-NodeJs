"use strict";

var mongoose = require("mongoose");

var AutoIncrement = require('mongoose-sequence')(mongoose); // const AutoIncrement=require("@typegoose/auto-increment")(mongoose);


var ChildSchema = new mongoose.Schema({
  _id: Number,
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 2,
    max: 5
  },
  level: {
    type: String,
    required: true,
    "enum": ["PreKG", "KG1", "KG2"],
    "default": "PreKG"
  },
  address: [{
    city: {
      type: String,
      required: [true, "City is required"]
    },
    street: {
      type: String,
      required: [true, "Street is required"]
    },
    building: {
      type: Number,
      required: [true, "Building is required"]
    }
  }]
}, {
  _id: false
});
/**-------------------------------------------------------------------------*/

ChildSchema.plugin(AutoIncrement);
/**-------------------------------------------------------------------------*/

mongoose.model("childern", ChildSchema);