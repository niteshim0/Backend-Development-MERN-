import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  diagonsedWith:{
    type:String,
    required:true,
  },
  address:{
    type:String,
    required:true,
   },
   age:{
    type:Number,
    required:true,
   },
   bloodGroup:{
    type:String,
    required:true,
   },
   gender:{
    type:String,
    enum:["MALE","FEMALE","OTHERS"],//enum is like giving choices in which one state our model can be
    required:true,
   },
   admittedIn:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital",
    required:true,
   }
},{timestamps:true});

export const Patient = new mongoose.model("Patient",PatientSchema);