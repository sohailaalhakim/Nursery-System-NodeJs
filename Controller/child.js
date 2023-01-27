const express=require("express");
const mongoose=require("mongoose");
require("./../Model/childModel")
const ChildSchema=mongoose.model("childern");


exports.getAllChildern=(request,response,next)=>{
    ChildSchema.find({})
            .then((data)=>{
                response.status(200).json({message:"List of childern",data});
                console.log("params",request.params);
             })
            .catch(error=>{next(error)})
}

/*--------------------------------------------------------------------------*/
exports.getChildById=(request,response,next)=>{
    ChildSchema.findById(request.params.id)
               .then((data)=>{
                if(data!=null){response.status(200).json({message:"The Child:",data})}
                else{throw new Error("This Child is not exist")}
               })
               .catch(error=>{next(error)})
}
/*--------------------------------------------------------------------------*/

exports.addNewChild=(request,response,next)=>{
    let newChild=new ChildSchema({
        _id: request.body.id,
        fullName:request.body.fullName,
        age:request.body.age,
        level:request.body.level,
        address:request.body.address,
    });
    newChild.save()
             .then((result)=>{
                response.status(200).json({message:"Child added successfully ",result});
             })
             .catch(error=>{next(error)})
}
/*--------------------------------------------------------------------------*/

exports.updateChildData=(request,response,next)=>{
    ChildSchema.updateOne({_id:request.body.id} , 
        {$set:{
             fullName:request.body.fullName,
             age:request.body.age,
             level:request.body.level,
             address:request.body.address,
        }}
        )
        .then(result=>{
            if(result.modifiedCount==0) //if user update child is not exist
            throw new Error("This Child is not exist");
            response.status(200).json({message:"Child updated successfully"});
    })
    .catch(error=>{next(error)})
/*--------------------------------------------------------------------------*/
//   ChildSchema.findById(request.body.id)
//              .then(data=>{ 
//                if(data==null)
//                   throw new Error("Child is not found");
//              data.fullNamerequest.body.childName,
//              data.age=request.body.childAge,
//              data.level=request.body.childLevel,
//              data.address=request.body.childAddress
//              console.log(data)
//              return data.save(); 
//               })
//               .then(data=>{
//               response.status(200).json({message:"Child updated successfully"});
//               })
//             .catch(error=>{next(error)})
}

/*--------------------------------------------------------------------------*/

exports.deleteChild=(request,response,next)=>{
    ChildSchema.findByIdAndDelete({_id:request.body.id},{})
               .then(result=>{
                if(result!=null){response.status(200).json({message:"Child Deleted successfully",result});
            }else{
                throw new Error("This Child is not exist")
            }
            })
            .catch(error=>{next(error)})        
}



