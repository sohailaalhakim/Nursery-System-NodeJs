const express=require("express");
const router=express.Router();
const controller=require("./../Controller/teacher");
const {body,query,param,validationResult}=require("express-validator");
const validator=require("./../Middlewares/errorValidation");
const validationObject=require("./../Middlewares/teacherValidationObject");

router.route("/teachers")
      .get(controller.getAllTeachers)
      .post(controller.addNewTeacher)
      .patch(controller.updateTeacherData)
      .delete(validationObject,validator,controller.deleteTeacher)
      
module.exports=router;