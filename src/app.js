import express from "express"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import paymentRoutes from "./routes/payment.routes.js"
import {fileURLToPath} from "url"
import { dirname } from 'path';
import  path  from "path"
import { connectDataBase } from "./db.js"
import authRoutes from "./routes/user/auth.routes.js"
import productsRoutes from "./routes/admin/products.routes.js"
import productsCartRoutes from "./routes/user/productsCart.routes.js"
import providerProductsRoutes from "./routes/admin/providerProducts.routes.js"
import employeesRoutes from "./routes/admin/employees.routes.js"
import ordersRoutes from "./routes/orders.routes.js"



const app = express()

connectDataBase()

/*import.meta.url proporciona la URL del modulo actual, la funcion fileURLToPath toma esa url
y la convierte en una ruta de sistema de archivos, asi que se esta obteniendo la ruta completa
del archivo actual y la almacena en la constante __filename*/
// const __filename = fileURLToPath(import.meta.url);
// console.log(__filename)
/*dirname toma la ruta del archivo __filename y devuelve el directorio al que pertenece, osea que,
__dirname contiene la ruta del directorio que contiene el archivo actual*/ 
// const __dirname = dirname(__filename);
// console.log(__dirname)

/*express.static es para servir archivos estaticos desde la carpeta uploads, que esta a un nivel
superior del directorio actual, los '..' es para subir un nivel en la jerarquia de directorios,
entonces se le indica que del directorio actual que es src,suba un nivel que seria a api-prohogar-v2
y entre al directorio uploads. Los archivos solo seran servidos a las peticiones que inicien con /api*/
// app.use('/api', express.static(path.join(__dirname,'..', 'uploads')));
app.use(cors({
    // origin:"https://muebleria-prohogar.netlify.app",
    origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    /*Establece las cookies en ese dominio*/ 
    credentials:true
}))
app.use(express.json())
app.use(morgan("dev"))
/*cookieParser es para que express pueda convertir las cookies que llegan a un formato json*/ 
app.use(cookieParser())


app.use('/api', authRoutes)
app.use('/api',productsRoutes)
app.use('/api',productsCartRoutes)
app.use('/api',providerProductsRoutes)
app.use('/api',paymentRoutes)
app.use('/api',employeesRoutes)
app.use('/api',ordersRoutes)

export default app
