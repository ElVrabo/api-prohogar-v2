import orderProducts from "../models/ordersProducts.model.js"

export async function getOrderProducts(req,res){
    try {
        const getOrderProducts = await orderProducts.find()
        if(!getOrderProducts || getOrderProducts.length < 0){
         res.status(204).json({error:"No hay ninguna orden de producto"})
        }
        res.json(getOrderProducts)
    } catch (error) {
        console.log(error)
    }
}