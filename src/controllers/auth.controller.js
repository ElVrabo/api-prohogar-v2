import User from "../models/users.model.js"
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"
import { createAccesToken } from "../libs/jwt.js"
// import { use } from "bcrypt/promises.js"

class userController{
    async registerUser(req,res){
        try {
            const {email,username,password,date} = req.body
            const userFound = await User.findOne({email})
            if(userFound){
                return res.status(404).json(['El email ya esta en uso'])
            }
            const passwordHash = await bcrypt.hash(password,10)
            const createUser = new User({
                date,
                email,
                username,
                password:passwordHash
            }) 
            const saveUser = await createUser.save()
             res.json(saveUser)
           } catch (error) {
            
            res.status(500).json({error:error.response})
           }
    }
    async login(req,res){
        try {
            const {username,password} = req.body
            const userFound = await User.findOne({username})
            if(!userFound){
                return res.status(404).json(['El usuario no existe'])
            }
            /*Se compara la contraseña que el usuario escribe en el body con la del usuario
            encontrado en la base de datos*/ 
            const isMatch = await bcrypt.compare(password,userFound.password)
            if(!isMatch){
                return res.status(404).json(['La contraseña es incorrecta'])
            }
            /*Si las credenciales del usuario son correctas, entonces se crea un token de acceso
            con el id del usuario encontrado*/ 
            const token=await createAccesToken({id:userFound._id})
            /*Y se va a establecer en el navegador una cookie llamada token y su valor sera el
            token creado */ 
             res.cookie('token',token)
             res.json(userFound)
        } catch (error) {
            res.status(500).json({error:error.response})
        }
    }
    async verifyToken(req,res){

        const {token}=req.cookies

/*Si no se encuentra ningún token que manda el cliente, responde con un estado de error 401 
(No autorizado) y un mensaje indicando que el usuario no está autorizado.*/ 
if(!token)
    return res.status(401).json({message:"no estas autorizado"});

    /*Si se proporciona un token, utiliza la biblioteca jwt.verify() 
    para verificar la validez del token.*/ 
    jwt.verify(token,TOKEN_SECRET,async(err,user)=>{

        /*Si hay un error al verificar el token 
        (por ejemplo, si el token está caducado o inválido),
         responde con un estado de error 401 (No autorizado) 
         y un mensaje indicando que la autorización ha fallado.*/ 
        if(err) return res.status(401).json({message:"no autorizado"})

        /*Si el token es válido, utiliza el user.id del token decodificado para 
        buscar el usuario que inicio sesion en la base de datos */ 
        const userFound = await User.findById(user.id)

        /*Si no encuentra el usuario devuelve un message con un error*/
        if(!userFound) return res.status(401).json({message:"no autorizado"})

        /*si se encuentra el usuario, respondera en un json con la informacion
        de ese usuario que inicio sesion*/ 
        return res.json(userFound)
    })
    }
    async editProfile(req,res){
        try {
            const id = req.params.id
            const newProfile = req.body
            /*si en la peticion viene un archivo, entonces agregara el nombre de ese
            archivo a una propiedad nombrada avatar*/ 
            if(req.file){
                newProfile.avatar = req.file.filename
            }
            const foundProfile = await User.findByIdAndUpdate(
               id,
               newProfile,
               {new:true}
            )
            if(!foundProfile){
                res.status(404).json({error:'El usuario no fue encontrado'})
            }
               res.json(foundProfile)
        } catch (error) {
            res.status(500).json({error:error.response})
        }
    }
    async getUser(req,res){
        try {
            const userID = req.params.id
            const foundUser = await User.findById(userID)
            if(!foundUser){
                res.status(404).json({error:"El usuario no se encontro"})
            }
             res.json(foundUser)
        } catch (error) {
            res.status(500).json({error:error.response})
        }
    }
    async addAddressUser(req,res){
        try {
        /*en req.user esta el usuario que esta haciendo la peticion, esto se
        establece en el middleware authRequired*/
            const userID = req.user.id
          const {estado,municipio,cp,colonia,calle,numerodecasa, telefono}  = req.body 
          const user = await User.findById(userID)
          
          if(!user.address){
          user.address = []
          }
          user.address.push({
          estado,
          municipio,
          cp,
          colonia,
          calle,
          numerodecasa,
          telefono
          }
          )
          const saveAddress = await user.save()
          res.json(saveAddress)
         
        } catch (error) {
            /*el codigo 500 le indica al cliente, que hubo un error interno del
            servidor*/ 
         res.status(500).json({error:error.response})   
        }
    }
    async test(req,res){
        res.json({message:"funcion"})
    }

}


export default userController