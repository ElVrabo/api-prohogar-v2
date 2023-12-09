import { Router } from "express";
import {authRequired} from "../middlewares/validatorToken.js"
import Payment from "../controllers/payment.controller.js";

const paymentRoutes  = Router()
 
paymentRoutes.post('/payment',authRequired,Payment)

export default paymentRoutes