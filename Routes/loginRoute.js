const express=require("express");
const { route } = require("./teacherRoute");
const router=express.Router();
const controller=require("./../Controller/login")

router.route("/login")
     .post(controller.login)
     module.exports=router;