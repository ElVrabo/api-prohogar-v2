import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
    },
    rol:{
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('employees',employeesSchema)