import mongoose from "mongoose";

const schemaProductsAdmin = new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
  
   
  

})

export default mongoose.model('productsOnSale', schemaProductsAdmin)