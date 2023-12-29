import { Router } from "express";
import { addFavoriteProducts, deleteFavoriteProducts, getFavoriteProducts } from "../../controllers/favoriteProducts.controller.js";

 

const favoriteProductsRoutes = Router()

favoriteProductsRoutes.get('/favoriteProducts',getFavoriteProducts)
favoriteProductsRoutes.post('/favoriteProducts',addFavoriteProducts)
favoriteProductsRoutes.delete('/favoriteProducts', deleteFavoriteProducts)

export default favoriteProductsRoutes