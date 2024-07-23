import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
    preference_id:{
        type:String,
        required:true
    },
    user:{
      type:String,
      required:true
    }
})

export default mongoose.model('orders', ordersSchema)