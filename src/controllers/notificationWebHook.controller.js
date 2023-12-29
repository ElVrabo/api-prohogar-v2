// import User from "../models/users.model.js"
// import orderProduct from "../models/ordersProducts.model.js"
import axios from "axios"
export async function notificationMercadoPago (req,res){
    try {
        const paymentStatus = req.body?.action
        const dataID = req.query.data
        res.status(200).send('ok')
        if(paymentStatus === 'test.created' && dataID.id){
            console.log('El pago se realizo correctamente')
            console.log(paymentStatus)
            console.log(dataID)
        }
    } catch (error) {
        console.log('Ocurrio el siguiente error', + error)
    }

   
}

async function getTransactionId(id){
    const res = axios.post()
    return res.data
}