import mongoose from "mongoose";

const schemaProductsAdmin = new mongoose.Schema({
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
    specifications:{
        type:Array,
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
    image:{
        type:String,
    },
    reviews:{
        type:Array,
    }
  

})

export default mongoose.model('productsOnSale', schemaProductsAdmin)