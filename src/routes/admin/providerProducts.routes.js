import { Router } from "express";
import { addProviderProduct,  deleteProviderProduct, filterProviderProduct, getProvidersProducts } from "../../controllers/providerProducts.controller.js";

const providerProductsRoutes = Router()

providerProductsRoutes.get('/providerProducts',getProvidersProducts)
providerProductsRoutes.get('/filterProviderProducts',filterProviderProduct)
providerProductsRoutes.post('/providerProducts',addProviderProduct)
providerProductsRoutes.delete('/providerProducts/:id',deleteProviderProduct)
export default providerProductsRoutes