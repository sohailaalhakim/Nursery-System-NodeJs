const { request, response } = require("express");
const Teacher=require("./../Model/teachersModel");
const mongoose=require("mongoose");
const TeacherSchema=mongoose.model("teachers");


exports.getAllTeachers=(request,response,next)=>{
    TeacherSchema.find({})
           .then((data)=>{
            response.status(200).json({
                message:"List of Teachers",data
           }); 
           console.log("params",request.params);
        })
           .catch(error=>{next(error)})
}
//---------------------------------------------------------

exports.addNewTeacher=(request,response,next)=>{
    let newTeacher=new TeacherSchema({
        // _id: mongoose.Types.ObjectId(),
        fullname:request.body.fullname,
        password:request.body.password,
        email:request.body.email,
        image:request.body.image,
    });
    newTeacher.save()
              .then((result)=>{
                response.status(200).json({message:"Teacher Added Done successfully",result});
                console.log("body",request.body);

              })
              .catch(error=>{next(error)})
}
//-------------------------------------------------------------

exports.updateTeacherData=(request,response,next)=>{
    TeacherSchema.updateOne({_id:request.body._id},{$set:{
        fullname:request.body.fullname,
        // password:request.body.password,
        // email:request.body.email,
        // image:request.body.image,
    }}
    )
    .then(result=>{
        if(result.matchedCount==0){
            throw new Error("This teacher is not found");
        }
        else{
            response.status(200).json({message:"Teacher Updating done successfully" , result});
        }
})
    .catch(error=>{next(error)})
}
//----------------------------------------------------------------

exports.deleteTeacher=(request,response,next)=>{
    TeacherSchema.findByIdAndDelete({_id:mongoose.Types.ObjectId(request.body._id)},{})
                 .then(result=>{
                    if(result!=null){response.status(200).json({message:"Teacher Deleted done successfully" , result});
                }else{
                    throw new Error("This teacher is not exist")
                }
                })
                .catch(error=>{next(error)})
}
//----------------------------------------------------------------------

