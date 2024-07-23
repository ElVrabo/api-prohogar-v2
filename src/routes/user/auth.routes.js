import { Router } from "express";
import {authRequired} from "../../middlewares/validatorToken.js"
import userController from "../../controllers/auth.controller.js"
import { upload } from "../../middlewares/upload.js";


const authRoutes = Router()
const UserController = new userController()

authRoutes.post('/register',UserController.registerUser)
authRoutes.post('/login',UserController.loginUser)
authRoutes.get('/verify', UserController.verifyToken)
authRoutes.put('/editUser/:id',authRequired,UserController.editUser)
authRoutes.get('/getUser/:id',authRequired,UserController.getUser)
authRoutes.post('/createAddressUser', authRequired, UserController.createAddressUser)
authRoutes.put('/changePasswordUser',authRequired,UserController.changePasswordUser)

export default authRoutes