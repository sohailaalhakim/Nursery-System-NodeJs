const express=require("express");
const router=express.Router();
// const express=require("express");
// const router=express.Router();
const controller=require("./../Controller/child");
const {body,query,param,validationResult}=require("express-validator");
const validator=require("./../Middlewares/errorValidation");
const validationObject=require("./../Middlewares/childValidationObject");



router.route("/child")
      .get(controller.getAllChildern)
      .post(validationObject,validator,controller.addNewChild)
      .patch(validationObject,validator,controller.updateChildData)
      .delete(validationObject,validator,controller.deleteChild)
      


router.route("/child/:id")
      .get(param("id").isInt().withMessage("Id must be integr"),
      controller.getChildById)
       
 module.exports=router;
