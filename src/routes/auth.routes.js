import { Router } from "express";
import {authRequired} from "../middlewares/validatorToken.js"
import userController from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.js";


const routerAuth = Router()
const UserController = new userController()

routerAuth.get('/test',UserController.test)
routerAuth.post('/register',UserController.registerUser)
routerAuth.post('/login',UserController.login)
routerAuth.get('/verify', UserController.verifyToken)
routerAuth.put('/editProfile/:id',authRequired,upload.single('avatar'),UserController.editProfile)
routerAuth.get('/getUser/:id',authRequired,UserController.getUser)
routerAuth.post('/addAddressUser', authRequired, UserController.addAddressUser)

export default routerAuth