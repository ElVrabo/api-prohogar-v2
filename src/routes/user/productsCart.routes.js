import { Router } from "express";
import { addProductCart, deleteProductCart, getProductsCart } from "../../controllers/productsCart.controller.js";
import { authRequired } from "../../middlewares/validatorToken.js";

const productsCartRoutes = Router()

productsCartRoutes.get('/productsCart',authRequired, getProductsCart)
productsCartRoutes.post('/productsCart',authRequired, addProductCart)
productsCartRoutes.delete('/productsCart/:id', deleteProductCart)

export default productsCartRoutes