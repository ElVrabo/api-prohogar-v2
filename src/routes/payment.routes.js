import { Router } from "express";
import {authRequired} from "../middlewares/validatorToken.js"
import  { Payment,WebHooks } from "../controllers/payment.controller.js";


const paymentRoutes  = Router()
 
paymentRoutes.post('/payment',authRequired,Payment)
paymentRoutes.post('/webhooks',WebHooks)

export default paymentRoutes