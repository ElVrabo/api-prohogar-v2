import favoriteProduct from "../models/favoritesProducts.model.js"
export const getFavoriteProducts = async(req,res)=>{
  try {
    const favoriteProducts = await favoriteProduct.find({
        /*req.user.id es el id del usuario que esta haciendo la peticion*/ 
        user:req.user.id
  })
  res.json(favoriteProducts)
  } catch (error) {
   res.json({error:error.message}) 
  }
}
export const addFavoriteProducts = async(req,res)=>{
   try {
    const {name,description,price,image,date} = req.body
    const addFavoriteProduct = new favoriteProduct({
        name,
        description,
        price,
        image,
        date,
        user:req.user.id
    })
    const saveFavoriteProduct = await addFavoriteProduct.save()
    res.json(saveFavoriteProduct)
   } catch (error) {
    res.json({error: error.message})
   }
}

export const deleteFavoriteProducts = async(req,res)=>{
try {
  const id = req.params.id
  const favoriteProductFound = await favoriteProduct.findByIdAndDelete(id)
  if(!favoriteProductFound){
    return res.status(404).json({error:"No se encontro el producto"})
  }
    return res.status(200)
} catch (error) {
  
}
}