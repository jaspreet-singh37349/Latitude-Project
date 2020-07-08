const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(res=>{
    console.log("MongoDB Connected")
}).catch(e=>console.log("error"))