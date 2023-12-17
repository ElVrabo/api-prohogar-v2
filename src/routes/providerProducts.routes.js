import { Router } from "express";
import { addProviderProducts, filterProviderProducts, getProvidersProducts } from "../controllers/providerProducts.controller.js";

const routerProviderProducts = Router()

routerProviderProducts.get('/providerProducts',getProvidersProducts)
routerProviderProducts.get('/filterProviderProducts',filterProviderProducts)
routerProviderProducts.post('/providerProducts',addProviderProducts)

export default routerProviderProducts