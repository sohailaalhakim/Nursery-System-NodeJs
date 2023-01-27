const {body,query,param,validationResult}=require("express-validator");

module.exports=[
    body("name").isString().withMessage("Name must be string").isLength({max:30,min:3}),
    body("supervisor").isMongoId().withMessage("supervisor ID should be object ID"),
    body("childId").isArray({min:10,max:100}).withMessage("Class should have at least ten students ans max 100 students IDs")
  ]