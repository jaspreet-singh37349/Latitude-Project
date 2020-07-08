const express=require('express');
const User=require('../models/user');
const auth=require('../middleware/auth');
const validator=require('validator')
const validate = require('../validation/validd');
const bcrypt=require('bcryptjs');

const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIcUHqpf88Rq-eW8LwxaZOLc2ESPDBnklexw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXRvUBtumSw6XlzUX71fhs3hcSqe2Crm2bqQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTh9sjugPEaXRJjuoRA96x4a70Z4a2KboQOYg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgswCFmbTpJmErjtFi_oOL8Q87v4W3jUQEDw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRICHgDuW1OZSSCrJg5UhA93eW3RNiqWIn_dg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCFsjOAeLS23l3jEVetv8HkXLcRDyChWiVpw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1bAuFJr32C0jUOvUh7LvelN8pi7LoI1jpiQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNxTZsNj-N0XLC42e1fsKDdoGUHJnQER9uxw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH9wl-bqdmX5reAgwriw-mZu_ZAMByQwzRkQ&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTF482Yl5VL3paDnv1MKw_dOwyq1e__NgWGiw&usqp=CAU"
]


const router=new express.Router();

router.get('/',(req,res)=>{
    return res.status(200).json(images);
})

router.post('/user/signup',async (req,res)=>{
    //console.log(req.body)
    const { errors, isValid } = validate(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(async user => {
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        }

        try{
            const user=new User(req.body);
            await user.save();
            const token= await user.generateAuthToken();
            res.status(201).send({Fname:user.Fname,Lname:user.Lname,email:user.email,bookedCars:user.bookedCars,token});
        }catch(e){
            return res.status(400).json(e.toString());
        }
        
    })

    
})
router.post('/user/login',async (req,res)=>{

    
   
        const { errors, isValid } = validate(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        try{
        const user=await User.findOne({ email: req.body.email })

        if (user) {
            const match=await bcrypt.compare(req.body.password,user.password);
            
          if(match)
          {
            const token=await user.generateAuthToken();
            res.send({token,images});
          }
          else
          {
            errors.password = "Password did not match"
            return res.status(400).json(errors);
          }
          
        }
    }
    catch(e){
        console.log(e)
        return res.status(400).json({"Error":e});
    }
})



module.exports=router;