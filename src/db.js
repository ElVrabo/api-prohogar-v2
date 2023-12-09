import mongoose from "mongoose"
import dotenv from "dotenv"
/*Las variables de entorno de .env se cargaran en el objeto procces.env cuando se llame a
dotenv.config*/
dotenv.config()

export async function connectDataBase(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9fxfoaa.mongodb.net/?retryWrites=true&w=majority`,{
            dbName:"muebleria-prohogar"
        })
        console.log('Base de datos conectada con exito')
    } catch (error) {
        console.log('ocurrio el error', error)
    }
}