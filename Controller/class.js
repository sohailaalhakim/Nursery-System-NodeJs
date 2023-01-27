const { request, response } = require("express");
const express=require("express");
const { body } = require("express-validator");
const mongoose=require("mongoose");
require("./../Model/classModel");
const ClassSchema=mongoose.model("classes");


// exports.getAllClasses=(request,response,next)=>{
//     ClassSchema.find({})
//                .then((data)=>{
//                 response.status(200).json({message:"List of Classes",data});
//                })
//                .catch(error=>{next(error)})
// }
exports.getAllClasses=(request,response,next)=>{
    ClassSchema.find()
               .populate({
                path:"teachers",
                select:"fullname"
               })
               .populate({
                path:"childern",
                select:"fullName"
               })
               .then((data)=>{
               response.status(200).json({message:"List of Classes",data});
               })
               .catch(error=>{next(error)})
}
//--------------------------------------------------------------------------
exports.getClassById=(request,response,next)=>{
    ClassSchema.findById(request.params.id)
               .then((data)=>{
                if(data!=null){response.status(200).json({message:"The Child:",data})}
                else{throw new Error("Class is not found")}
               })
               .catch(error=>{next(error)})
}
//---------------------------------------------------------------------------
exports.addNewClass=(request,response,next)=>{
    let newClass=new ClassSchema({
        _id: request.body.id,
        name: request.body.name,
        teachers: request.body.supervisor,
        childern: request.body.childId,
    });
    newClass.save()
            .then((result)=>{
                response.status(200).json({message:"Class added successfully ",result});
            })
            .catch(error=>{next(error)})
}
//---------------------------------------------------------------------------
exports.updateClassData=(request,response,next)=>{
    ClassSchema.updateOne({_id:request.body._id},
        {$set:{
            name: request.body.name,
            // supervisor: request.body.supervisor,
            // childId: request.body.childId,
        }
    })
        .then(result=>{
            if(result.modifiedCount==0) //if user update child is not exist
            throw new Error("Class is not found");
            response.status(200).json({message:"Class updated successfully",result});
        })
        .catch(error=>{next(error)})
}
//---------------------------------------------------------------------------
exports.deleteClass=(request,response,next)=>{
    ClassSchema.deleteOne({_id:request.body._id},{})
            //    console.log(_id)
               .then(result=>{
                response.status(200).json({message:"Class Deleted successfully",result});
               })
               .catch(error=>{next(error)})
}
//---------------------------------------------------------------------------
exports.deleteClassByID = (request, response, next) => {
    ClassSchema.findByIdAndDelete(request.params.id)
        .then((result) => {
            if (result != null) {
                response.status(200).json({ "message": "This Class is deleted" });

            } else {
                throw new Error("This Class is not exist");
            }
        })
        .catch(error => next(error))
}
//---------------------------------------------------------------------------

exports.getClassChildern=(request,response,next)=>{
      ClassSchema.findOne({_id:request.params.id}).populate({
        path:"childern",
        select:"_id"
        
       })
                 .then(data=>{
                    { response.status(200).json({message:"response.Status(200)"})}
                    // if(data!=null){ response.status(200).json(data.childId)}
                    // else{
                    //     throw new Error("This Class is not exist");
                    // }
                })
                .catch(error=>{next(error)})
}
//---------------------------------------------------------------------------

exports.getClassTeacher=(request,response,next)=>{
       ClassSchema.findOne({_id:request.params.id}).populate({
        path:"teachers",
        select:"fullname"
       })
                 .then(data=>{
                    { response.status(200).json({message:"response.Status(200)"})}

                    // if(data!=null){ response.status(200).json(data.childId)}
                    // else{
                    //     throw new Error("This Class is not exist");
                    // }
                })
                .catch(error=>{next(error)})
}