import Product from "../models/productsCart.model.js"
export const getProductsCart=async(req,res)=>{
    try {
       /*Busca en el modelo Product unicamente los productos que le pertenezcan al 
       usuario que esta autenticado en ese momento*/ 
        const productsCart = await Product.find({
            /*en la propiedad user de req se guardo la informacion del usuario
            autenticado en el middleware validatorToken, por lo que este
            controlador puede acceder a esa informacion*/ 
            user:req.user.id
        })
        /*Devuelve al cliente esos productos del usuario autenticado*/ 
        res.json(productsCart)
    } catch (error) {
        res.json({error:error.message})
    }
}
export const addProductCart=async(req,res)=>{
    try {
        const {name,description,price,image,date} = req.body
        const addProductCart = new Product({
            name,
            description,
            price,
            date,
            image, /*Se guarda la propiedad image que venga desde el front*/
            /*En el campo user esta el id del usuario que realizo la peticion
            Esto viene del middleware authRequired, antes de llegar a este controlador
            verifica si el token es valido, si lo es establece ese usuario en req.user
            y se accede a la propiedad id de ese usuario*/ 
            user:req.user.id
        })
        const saveProductCart = await addProductCart.save()
        res.json(saveProductCart)
    } catch (error) {
        res.json({error:error.message})
    }
}
 export const deleteProductCart=async(req,res)=>{
    try {
        const productFound = await Product.findByIdAndDelete(req.params.id)
        if(!productFound){
            return res.status(404).json(['No se encontro el producto'])
        }
           return res.status(200)
    } catch (error) {
        
    }
}