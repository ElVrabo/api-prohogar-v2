import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    image:{
      type:String,
    },
    email:{
    type:String,
    required:true
    },
     username:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     date:{
        type:Date,
        default:Date.now()
     },
 
})

export default mongoose.model('User',usersSchema)