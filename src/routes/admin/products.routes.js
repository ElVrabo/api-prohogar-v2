import { Router } from "express";
import { createProduct, deleteProduct, editProduct, filterProductByName, getProductById, getProducts } from "../../controllers/products.controller.js";
import { upload } from "../../middlewares/upload.js";

const productsRoutes = Router()

productsRoutes.get('/productsOnSale',getProducts)
productsRoutes.post('/productsOnSale', upload.single('image'), createProduct)
productsRoutes.get('/productOnSale/:id',getProductById)
productsRoutes.delete('/productsOnSale/:id', deleteProduct)
productsRoutes.put('/productsOnSale/:id',upload.single('image'),editProduct)
productsRoutes.get('/filterProductByName',filterProductByName)

export default productsRoutes