import { Router } from "express";
import { getOrderProducts } from "../controllers/ordersProducts.controller.js";

const orderProductsRoutes = Router()

orderProductsRoutes.get('/orderProducts',getOrderProducts)

export default orderProductsRoutes