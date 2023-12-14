import dotenv from "dotenv"
import mercadopago from "mercadopago"
import User from "../models/users.model.js"

dotenv.config()

mercadopago.configure({
    access_token: process.env.ACCES_TOKEN_MERCADOPAGO
})

const Payment = async (req,res)=>{
     /*en req.user.id esta el usuario que realizo la peticion, este se establecio en
    el middleware authRequired, y por eso esta disponible*/ 
    const user = req.user.id

    /*se destructura el objeto que llega desde el cliente, que contiene las
    propiedades product y address*/
    const product = req.body
   
    /*En la bd se busca ese usuario por el id*/ 
    const foundUser = await User.findById(user)
    

let preference = {
    items:[
        {
            id:product._id,
            title:product.name,
            description:product.description,
            price:product.price,
            image:product.image,
            currency_id:"MXN",
            quantity:1,
            unit_price:product.price
        }
    ],
    // payer:{
    //   phone:{
    //     number:parseInt(address.telefono)
    //   },
    //   address:{
    //     zip_code:address.cp,
    //     street_name:address.calle,
    //     state:address.estado,
    //     city:address.municipio
    //   },
    //   email:foundUser.email,
    //   name:foundUser.username
    // },
    back_urls: {
        success:"http://localhost:3000",
        failure:"",
        pending:""
    },
    auto_return:'approved',
    binary_mode:true
}

mercadopago.preferences.create(preference).then((response)=>res.status(200).send({response})).catch((error)=>console.log('error',error))
}

export default Payment