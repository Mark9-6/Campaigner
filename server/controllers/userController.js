import userModel from "../models/UserModel.js";
import UserFile from "../models/UserFileModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from "multer";
import csvtojson from 'csvtojson'

 
 
const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
 

const registerUser = async(req,res)=>{
    try {
        const{firstName , lastName,email,phoneNumber,panCardNumber,password} = req.body;
        if(!firstName || !lastName || !email || !panCardNumber || !password){
            return res.json({success:false , message:"Missing"})
        }
        const existingUser = await userModel.findOne({
            $or:[{email} , {panCardNumber}]                     // aggregation pipeline /////////////////////////
        })  
        if(existingUser){
            return res.json({success:false ,message:"User aleready exists!" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password ,salt);
        const userData = {
            firstName,lastName,email,phoneNumber,panCardNumber,password:hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);

        return res.json({success:true , token ,user})   // on registration provide these


    } catch (error) {
        console.log(error);
        res.json({success:false  , message:error.message});
    }
}

const loginUser = async(req,res)=>{
    try {
        const{email ,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false , message:"user doesnt exists"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        // console.log(user)
        if(isMatch){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET);
            return res.json({success:true , token ,user})   // on login provide these
         }
         else {
            return res.json({success:false , message:"Wrong password"})
        }
       
    

    } catch (error) {
        console.log(error);
        res.json({success:false  , message:error.message});
    }
}

const updatePhoneNumber = async(req,res)=>{
   try {
    const {userId , data} = req.body;
    if(!userId||!data){
        return res.status(404).json({success:false ,message:"invalid details"});
    }
    
    const user = await userModel.findByIdAndUpdate(userId,
        {phoneNumber:data}
    )
    if(user){
        return res.status(200).json({success:true, message:"Details saved successfully"});
    }
    else  return res.status(200).json({success:false, message:"error saving Details"});
   } catch (error) {
       console.log(error);
       return res.status(200).json({success:false, message:error});
   }

}


const updatePassword = async(req,res)=>{
   try {
    const {userId , data} = req.body;
    if(!userId||!data){
        return res.status(404).json({success:false ,message:"invalid details"});
    }
    
    const user = await userModel.findByIdAndUpdate(userId,
        {password:data}
    )
    if(user){
        return res.status(200).json({success:true, message:"Details saved successfully"});
    }
    else  return res.status(200).json({success:false, message:"error saving Details"});
   } catch (error) {
       console.log(error);
       return res.status(200).json({success:false, message:error});
   }

}







export {loginUser ,registerUser,updatePhoneNumber,updatePassword}