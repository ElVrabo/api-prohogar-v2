import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken"

export const authRequired = (req,res,next)=> {
    const {token} = req.cookies
    if(!token) return res.status(401).json({message:"No hay token"})
    
    /*Si si existe el token, con la propiedad verify de jwt se verificara ese token, se le
    pasara el TOKEN_SECRET, y un callback que se ejecuta si hay un error, y si todo sale bien
    me da los datos de ese token(usuario)*/
    jwt.verify(token,TOKEN_SECRET,(err,user)=>{
        /*si existen un error el verificar el token va a responder con un 
        status 401 y un mensaje de token invalido*/
        if(err) return res.status(401).json({message:"token invalido"})
        
        /*Si el token es verificado correctamente, se guardara ese usuario en req.user, que es
        la peticion del usuario que esta llegando, lo que hace que esten disponibles para cualquier
        controlador posteriores que manejen la solicitud, en este caso esta disponible para los
        controllers de products.controller*/ 
        req.user=user
    
        /*y continuara con la siguiente ruta, que es para agregar un producto al carrito*/
        next()
    })
    }
