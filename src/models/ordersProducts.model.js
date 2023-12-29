import mongoose from "mongoose";

const schemaOrdersProducts = new mongoose.Schema({
    client:{
        type:String
    },
    nameProduct:{
        type:String
    },
    price:{
        type:Number
    },
    orderAddress:{
        estado:{
            type:String
        },
        municipio:{
            type:String
        },
        colonia:{
            type:String
        }
    },
    date:{
        type:Date,
        default: Date.now()
    }
})

export default mongoose.model('orderProducts', schemaOrdersProducts)