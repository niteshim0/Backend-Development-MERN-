import mongoose from "mongoose";//compulsory statement 1

const subTodoSchema = new mongoose.Schema({
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
}, { timestamps: true });
//compulsory statement 2

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
//compulsory statement 3
