import { Router } from "express";
import productsController from "../controllers/products.controller.js";
import { authRequired } from "../middlewares/validatorToken.js";
import { addFavoriteProducts, deleteFavoriteProducts, getFavoriteProducts } from "../controllers/favoriteProducts.controller.js";
import { upload } from "../middlewares/upload.js";
import { addProductsCart, deleteProductsCart, getProductsCart } from "../controllers/productsCart.controller.js";

const routerProducts = Router()
const Products = new productsController

routerProducts.get('/products',authRequired,getProductsCart)
routerProducts.get('/favoriteProducts',authRequired,getFavoriteProducts)
routerProducts.get('/productsOnSale',Products.getProductsOnSale)
// routerProducts.get('/filterProducts',Products.searchProductsOnSale)
routerProducts.get('/filterProductsName',Products.filterProductsName)
routerProducts.get('/productsOnSale/:id',Products.getProductOnSale)
routerProducts.post('/favoriteProducts',authRequired,addFavoriteProducts)
routerProducts.post('/products',authRequired, addProductsCart)
routerProducts.post('/productsOnSale', upload.single('image'), Products.addProductsOnSale)
routerProducts.delete('/products/:id',deleteProductsCart)
routerProducts.delete('/favoriteProducts/:id',deleteFavoriteProducts)
routerProducts.delete('/productsOnSale/:id', Products.deleteProducsOnSale)
routerProducts.put('/editProductOnSale/:id',upload.single('image'),Products.editProductsOnSale)

export default routerProducts