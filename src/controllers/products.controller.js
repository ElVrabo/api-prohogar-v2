
import ProductsOnSale from "../models/productsAdmin.model.js"

class productsController{
 
    async getProductsOnSale(req,res){
        try {
            const productsOnSale = await ProductsOnSale.find()
            res.json(productsOnSale)
        } catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    async getProductOnSale(req,res){
        try {
            const id = req.params.id
            const foundProduct = await ProductsOnSale.findById(id)
            if(!foundProduct){
                res.status(404).json({error:"No se encontro el producto"})
            }
               res.json(foundProduct)
        } catch (error) {
           
        }
    }
    async addProductsOnSale(req,res){
        try {
        const {name,price,description,specifications,stock,category,date} = req.body
        /*req.file.filename es el nombre del archivo que viene de la peticion*/
        const image = req.file.filename
        const createProductOnSale = new ProductsOnSale({
            name:name,
            price,
            description,
            /*specifications es un array que viene desde la peticion*/ 
            specifications,
            stock,
            category,
            date,
            image
        })
        const savedProductOnSale = await createProductOnSale.save()
        res.json(savedProductOnSale)
        } catch (error) {
        res.json({message: error.message})
        }
    }
    async deleteProducsOnSale(req,res){
        const {id} = req.params
        try {
         const foundProductOnSale = await ProductsOnSale.findByIdAndDelete(id)
         if(!foundProductOnSale){
            return res.status(404).json({message:"No se encontro el prodcuto"})
         }
         return res.status(200)
        } catch (error) {
            
        }
    }
    async filterProductsName(req,res){
        try {
            const productName = req.query.productName
            const regex = new RegExp(productName,'i')
            const foundProducts = await ProductsOnSale.find({name:regex})
            if(!foundProducts || foundProducts.length === 0){
                res.status(404).json({error:"No se encontro el producto"})
               
            }
            res.json(foundProducts)
        } catch (error) {
            
        }
    }
    async editProductsOnSale(req,res){
        try {
            const {id} = req.params
            const updateProduct = req.body
            /* verificar si hay un nuevo archivo en la solicitud*/ 
            if(req.file){
                /*actualizar la propiedad image con el nombre del archivo que viene desde la
                peticion*/ 
                updateProduct.image = req.file.filename
            }
            const foundProduct = await ProductsOnSale.findByIdAndUpdate(
                id,
                updateProduct,
                {new:true} /*esta opcion en true devuelve el documento actualizado despues
                de la actualizacion*/
            ) 
            if (!foundProduct){
                res.status(404).json(['No se encontro el producto a editar'])
            }
                res.json(foundProduct)
        } catch (error) {
            
        }
    }
 
}

export default productsController