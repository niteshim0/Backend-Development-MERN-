import mongoose from "mongoose";//compulsory statement 1

const todoSchema = new mongoose.Schema({
  content:{
    type:String,
    required:true,
  },
  completed:{
    type:Boolean,
    default:false,
  },
  //connecting two user defined types
  createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
  },
  subTodos:[
     {type:mongoose.Schema.Types.ObjectId,
     ref:"SubTodo",
     }
  ],//Array of subtodo list
}, { timestamps: true });
//compulsory statement 2

export const Todo = mongoose.model("Todo", todoSchema);
//compulsory statement 3
