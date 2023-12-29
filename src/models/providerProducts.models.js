import mongoose from "mongoose"

 const schemaProviderProducts = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    razon_social:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    rfc:{
        type:String,
        
    },
    gmail:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    }

 })

 export default mongoose.model('providerProducts',schemaProviderProducts)