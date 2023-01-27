const { validationResult } = require("express-validator")

module.exports=(request,response,next)=>{
    let result=validationResult(request);
    // console.log(result)
    if(result.errors.length!=0){
        let message=result.errors.reduce((current,object)=>{
            return current+object.msg+" , "
         }," ")
         let error=new Error("Validation Error "+message);
         error.status=422; //422make sure request contains all valid fields and values
        next(error);
    }
    else{
        next();
    }
}