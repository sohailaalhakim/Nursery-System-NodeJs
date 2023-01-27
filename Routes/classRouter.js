const express=require("express");
const router=express.Router();
const {body,query,param,validationResult}=require("express-validator");
const controller=require("./../Controller/class");
const validator=require("./../Middlewares/errorValidation");
const validationObject=require("./../Middlewares/classValidationObject")

router.route("/class")
      .get(controller.getAllClasses)
      .post(validationObject,validator,controller.addNewClass)
      .patch(validationObject,validator,controller.updateClassData)
      .delete(validationObject,validator,controller.deleteClass)



router.route("/class/:id")
      .get(param("id").isInt().withMessage("Id search must be integr"),controller.getClassById)
      .delete(controller.deleteClassByID)

router.route("/classchildern/:id")
      .get(controller.getClassChildern)

router.route("/classteacher/:id")
      .get(controller.getClassTeacher)
module.exports=router;

// param("id").isInt().withMessage("Id must be integr"),