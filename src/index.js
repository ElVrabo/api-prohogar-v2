import app from "./app.js";
import { connectDataBase } from "./db.js";
// import { connectDataBase } from "./db.js";



const port = process.env.PORT || 4000

app.listen(port)
console.log('App escuchando en el puerto', +port)

