import { Router } from "express";
import { authRequired } from "../middlewares/validatorToken.js";
import { createOrder } from "../controllers/orders.controller.js";


const ordersRoutes = new Router()

ordersRoutes.post('/orders', authRequired, createOrder)

export default ordersRoutes