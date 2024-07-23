
import ProductsOnSale from "../models/productsAdmin.model.js"
import User from "../models/users.model.js"


 
   export async function getProducts(req,res){
        try {
            const productsOnSale = await ProductsOnSale.find()
            if(productsOnSale.length < 0){
                return res.status(404).json({error:"No se encontro ningun producto"})
            }
             res.status(200).json(productsOnSale)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
   export async function  getProductById(req,res){
        try {
            const id = req.params.id
            const foundProduct = await ProductsOnSale.findById(id)
            if(!foundProduct){
                return res.status(404).json({error:"No se encontro el producto"})
            }
               res.status(200).json(foundProduct)
        } catch (error) {
           
        }
    }
    export async function createProduct(req,res){
        try {
            const {image,name,price,description,stock,category,date} = req.body
            /*req.file.filename es el nombre del archivo que viene de la peticion*/
        const createProductOnSale = new ProductsOnSale({
            image,
            name:name,
            price,
            description,
            /*specifications es un array que viene desde la peticion*/ 
            stock,
            category,
            date,

            
        })
      
        const savedProductOnSale = await createProductOnSale.save()
        res.status(201).json({message:"EL producto se agrego correctamente"})
        
        } catch (error) {
       
        }
    }
    export async function  deleteProduct(req,res){
        const {id} = req.params
        try {
         const foundProductOnSale = await ProductsOnSale.findByIdAndDelete(id)
         if(!foundProductOnSale){
             res.status(404).json({message:"No se encontro el producto"})
         }
            res.status(200).json({message:"El producto se elimino correctamente"})
        } catch (error) {
            
        }
    }
    export async function  filterProductByName(req,res){
        try {
            const productName = req.query.ProductName
            const regex = new RegExp(productName,'i')
            const foundProducts = await ProductsOnSale.find({name:regex})
            if(!foundProducts || foundProducts.length === 0){
                res.status(404).json({error:"No se encontro el producto"})
               return
            }
            res.status(200).json(foundProducts)
        } catch (error) {
            
        }
    }
    export async function editProduct(req,res){
        try {
            const {id} = req.params
            const updateProduct = req.body
            const foundProduct = await ProductsOnSale.findByIdAndUpdate(
                id,
                updateProduct,
                {new:true} /*esta opcion en true devuelve el documento actualizado despues
                de la actualizacion*/
            ) 
            if (!foundProduct){
                res.status(404).json(['No se encontro el producto a editar'])
                return
            }
                res.status(201).json({message:"El producto se actualizo con exito"})
        } catch (error) {
            
        }
    }
   
 


