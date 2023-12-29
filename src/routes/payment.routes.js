import { Router } from "express";
import {authRequired} from "../middlewares/validatorToken.js"
import Payment from "../controllers/payment.controller.js";
import { notificationMercadoPago } from "../controllers/notificationWebHook.controller.js";

const paymentRoutes  = Router()
 
paymentRoutes.post('/payment',authRequired,Payment)
paymentRoutes.post('/webhooks-mercadopago',notificationMercadoPago)

export default paymentRoutes