
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
    async searchProductsOnSale(req,res){
        try {
            const product = req.query.nameProduct
            /*Se crear una expresion regular usando el patron basado en el valor que mande
            el cliente desde la query, la 'i' significa que la busqueda sea insensible a 
            mayusculas y minusculas*/ 
            const regex = new RegExp(product,'i')

            /*En la coleccion se buscaran aquellos productos que en su propiedad name
            coincida con la expresion regular que se creo en base al valor que llega del
            cliente. Es decir, si en la propiedad name hay un producto "base de cama, y la query
            que viene del cliente es "cama", recuperara ese documento ya que cama es parte de ese
            valor"*/ 
            const foundProductOnSale = await ProductsOnSale.find({name:regex})
            if(!foundProductOnSale || foundProductOnSale.length === 0){
                res.status(404).json({error:"No se encontro el producto"})
            }
                res.json(foundProductOnSale)
        } catch (error) {
                
        }
    }
    async filterProductsCategory(req,res){
        try {
            const category = req.query.categoryProduct
            const foundProducts = await ProductsOnSale.find({category})
            if(!foundProducts || foundProducts.length === 0){
                res.status(404).json({error:"Por el momento no hay productos en esta categoria"})
               
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