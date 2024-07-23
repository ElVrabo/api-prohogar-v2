import Orders from "../models/orders.model.js"
export const createOrder = async (req,res)=>{
  const {preference_id} = req.query 
  const {username} = req.body
  try {
    const newOrder = new Orders({
        preference_id,
        user:username,
    })
    await newOrder.save()
    return res.json({message:'La orden se creo con exito'})
  } catch (error) {
    console.log('Ocurrio el siguiente error', error)
    
  }
}