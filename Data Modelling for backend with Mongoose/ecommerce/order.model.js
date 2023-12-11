import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId:{
    type : mongoose.Schema.Types.ObjectId,
    ref: "Product",
   },
   quantity:{
    type:Number,
    required:true,
   },
   address:{
    type:String,
    required:true,
   },
   status:{
    type:String,
    enum:["PENDING","CANCELLED","DELIVERED"],//enum is like giving choices in which one state our model can be
    default:"PENDING",
   }


});




const orderSchema = new mongoose.Schema({
 orderPrice:{
  type:Number,
  required:true,
 },
 customer:{
  type : mongoose.Schema.Types.ObjectId,
  ref: "User",
  required:true
 },
 orderItems:{
  type:[orderItemSchema],
 },

},{timestamps:true});

export const Order = mongoose.model("Order",orderSchema);