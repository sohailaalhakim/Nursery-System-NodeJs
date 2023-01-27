const jwt=require("jsonwebtoken")

exports.login=(request,response,next)=>{
    let token;
    //for admin
    if(request.body.userName=="sohaila"&&request.body.password==12345)
    {
        token= jwt.sign({role:"admin",userName:"eman"},
        "NodeJsSecretKey",{expiresIn:"2h"})
        response.status(200).json({message:"logged In",token})


    }
    else
    {
        let error = new Error("Not Authenticated") 
    }

}
