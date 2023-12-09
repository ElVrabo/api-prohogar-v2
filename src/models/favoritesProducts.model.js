import mongoose from "mongoose";

const schemaFavoriteProducts = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        /*el tipo de datos es un ObjectId de MongoDB. Los ObjectId son identificadores únicos de
         12 bytes generados automáticamente por MongoDB para cada documento en una colección.*/
        type:mongoose.Schema.Types.ObjectId,
        /*Se establece una referencia al modelo User, significa que el campo user tendra
        un objectID que se relaciona con un documento en la coleccion 'User'*/ 
        ref:'User',
        required:true
    }
})

export default mongoose.model('favoriteProduct',schemaFavoriteProducts)