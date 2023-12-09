import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
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
     avatar:{
      type:String,
     },
     address:{
      type: Array
     }
})

export default mongoose.model('User',usersSchema)