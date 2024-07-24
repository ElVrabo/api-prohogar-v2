import User from "../models/users.model.js"
import dotenv from "dotenv"
import mercadopago from "mercadopago"

// import { response } from "express"

dotenv.config()

mercadopago.configure({
    access_token: process.env.ACCES_TOKEN_MERCADOPAGO
})

const Payment = async (req,res)=>{
     /*en req.user.id esta el usuario que realizo la peticion, este se establecio en
    // el middleware authRequired, y por eso esta disponible*/ 
    const user = req.user.id
    //  /*En la bd se busca ese usuario por el id*/ 
     const foundUser = await User.findById(user)
    /*se destructura el objeto que llega desde el cliente, que contiene las
    propiedades product y address*/
    const {id,name,description,price,image} = req.body
   
    
   

let preference = {
    items:[
        {
            id,
            title:name,
            description,
            price,
            image,
            currency_id:"MXN",
            quantity:1,
            unit_price:price
        }
    ],
    back_urls: {
        success:"http://localhost:3000/successPayment",
        failure:"http://localhost:3000/errorPayment",
        pending:""
    },
    auto_return:'approved',
    notification_url:'https://api-ecommerce-prohogar.vercel.app/api/webhooks',
    binary_mode:true
}
try {
    const createPreferences = await mercadopago.preferences.create(preference)
    const response = await createPreferences.response
    res.status(200).send(response)

    // req.client = user
    // req.information = {name,description,price,image,estado,municipio,colonia}
} catch (error) {
    
}
}

const WebHooks = async(req,res)=>{
     const paymenrId = req.query.id
     try {
     const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymenrId}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${process.env.ACCES_TOKEN_MERCADOPAGO}`
        }
     })
     if(res.ok){
        const data = await res.json()
        console.log(data)
     }
     res.status(200)
     } catch (error) {
        console.log('Ocurrio el siguiente error', error)
        res.status(500)
     }
}

export {Payment, WebHooks}