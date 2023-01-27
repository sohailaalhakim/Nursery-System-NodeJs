const express=require("express");
const morgan=require("morgan");
const app=express();
const teacherRouter=require("./Routes/teacherRoute");
const childRouter=require("./Routes/childRouter");
const classRouter=require("./Routes/classRouter");
const mongoose=require("mongoose");
const login=require("./Routes/loginRoute")


// app.use(morgan("common")); //common, tiny, combined, dev, short
let port=process.env.PORT||8080;

//set DB connection
mongoose.set("strictQuery",true);
mongoose.connect("mongodb://127.0.0.1:27017/nurseryDB")
        .then(()=>{
            console.log("DB Connected");
            app.listen(port, ()=>{
                console.log("Server listening on port: 8080.....");
                }); 
        })
        .catch(error=>{
            console.log("DB Problem " + error);
        })
//first middleware using morgan 
app.get('/', function(request, response,next) {
    response.send('hello from first middleWare'),
    next();
})
// app.use(morgan(':method :url :status')); //using format string of perdefined tokens

app.use(express.json());
app.use(login);

app.use(teacherRouter);
app.use(childRouter);
app.use(classRouter);

//General middleware for not Found url pathes with 404 status code
app.use((request,response,next)=> {
    response.status(404).json({data:"Not Found"})
});
//Error handling middleware
app.use((error,request,response,next)=> {
    response.status(500).json({message: "Error" + error});
});


