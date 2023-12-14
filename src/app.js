import express from "express"
import morgan from "morgan"
import cors from "cors"
import routerAuth from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import routerProducts from "./routes/products.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import {fileURLToPath} from "url"
import { dirname } from 'path';
import  path  from "path"


const app = express()

/*import.meta.url proporciona la URL del modulo actual, la funcion fileURLToPath toma esa url
y la convierte en una ruta de sistema de archivos, asi que se esta obteniendo la ruta completa
del archivo actual y la almacena en la constante __filename*/
const __filename = fileURLToPath(import.meta.url);

/*dirname toma la ruta del archivo __filename y devuelve el directorio al que pertenece, osea que,
__dirname contiene la ruta del directorio que contiene el archivo actual*/ 
const __dirname = dirname(__filename);

/*express.static es para servir archivos estaticos desde la carpeta uploads, que esta a un nivel
superior del directorio actual, los '..' es para subir un nivel en la jerarquia de directorios,
entonces se le indica que del directorio actual que es src,suba un nivel que seria a api-prohogar-v2
y entre al directorio uploads. Los archivos solo seran servidos a las peticiones que inicien con /api*/
app.use('/api', express.static(path.join(__dirname,'..', 'uploads')));
app.use(cors({
    origin:"http://localhost:3000",
    /*Establece las cookies en ese dominio*/ 
    credentials:true
}))
app.use(express.json())
app.use(morgan("dev"))
/*cookieParser es para que express pueda convertir las cookies que llegan a un formato json*/ 
app.use(cookieParser())


app.use('/api', routerAuth)
app.use('/api',routerProducts)
app.use('/api',paymentRoutes)

export default app
