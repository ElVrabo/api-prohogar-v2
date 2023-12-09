import dotenv from "dotenv"
import mercadopago from "mercadopago"

dotenv.config()

mercadopago.configure({
    access_token: process.env.ACCES_TOKEN_MERCADOPAGO
})

const Payment = (req,res)=>{
    const product = req.body
    const user = req.user
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
    payer:{
       name:user.username,
       email:user.email,
       address:{
        state:user.address[0].state,
        municipio:user.address[0].municipio,
        colonia:user.address[0].colonia,
        calle:user.address[0].calle
       }
    },
    back_urls: {
        success:"http://localhost:3000",
        failure:"",
        pending:""
    },
    auto_return:'approved',
    binary_mode:true
}
mercadopago.preferences.create(preference).then((response)=>res.status(200).send({response}))
}

export default Payment