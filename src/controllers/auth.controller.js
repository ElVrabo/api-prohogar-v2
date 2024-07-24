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
            const userFoundEmail = await User.findOne({email})
            const userFoundUsername = await User.findOne({username})
            if(userFoundEmail){
                return res.status(404).json(['El email o el username ya estan en uso'])
            }
            if(userFoundUsername){
                return res.status(404).json(['El nombre de usuario ya esta en uso'])
            }
            const passwordHash = await bcrypt.hash(password,10)
            const createUser = new User({
                date,
                email,
                username,
                password:passwordHash
            }) 
            const saveUser = await createUser.save()
             res.status(201).json(saveUser)
           } catch (error) {
         
            res.status(500).json({error:error.response})
           }
    }
    async loginUser(req,res){
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
            // res.cookie('token',token)
             res.cookie('token',token , {
                httpOnly: true,
                secure: true, // Se habilita esto si se está usando HTTPS
                sameSite: 'None' // Necesario para permitir cookies cuando el front y back estan en diferentes dominios
             } )
             return res.status(201).json(userFound)
        } catch (error) {
            res.status(500).json({error:error.response})
        }
    }
    async verifyToken(req,res){

        const {token} = req.cookies

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
        if(err) return res.status(401).json({message:"no estas autorizado"})

        /*Si el token es válido, utiliza el user.id del token decodificado para 
        buscar el usuario que inicio sesion en la base de datos */ 
        const userFound = await User.findById(user.id)

        /*Si no encuentra el usuario devuelve un message con un error*/
        if(!userFound) return res.status(401).json({message:"no autorizado"})

        /*si se encuentra el usuario, respondera en un json con la informacion
        de ese usuario que inicio sesion*/ 
        return res.status(200).json(userFound)
    })
    }
    async editUser(req,res){
        try {
            const id = req.params.id
            const {image,username,email} = req.body
            const newProfile = {
                image,
                username,
                email,
            }
            const foundProfile = await User.findByIdAndUpdate(
               id,
               newProfile,
               {new:true}
            )
           
            if(!foundProfile){
                res.status(404).json({error:'El usuario no fue encontrado'})
            }
               res.status(204).json({message:"Informacion guardada"})
        } catch (error) {
            res.status(500).json({error:error.response})
            
        }
    }
    async getUser(req,res){
        try {
            const userID = req.params.id
            const foundUser = await User.findById(userID)
            if(!foundUser){
                return res.status(404).json({error:"El usuario no se encontro"})
            }
             res.status(200).json(foundUser)
        } catch (error) {
            res.status(500).json({error:error.response})
        }
    }
    async createAddressUser(req,res){
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
          await user.save()
          res.status(201)
         
        } catch (error) {
            /*el codigo 500 le indica al cliente, que hubo un error interno del
            servidor*/ 
         res.status(500).json({error:error.response})   
        }
    }
    async changePasswordUser(req,res){
        const id = req.user.id
        const {currentPassword,newPassword,confirmNewPassword} = req.body
      try {
        const foundUser = await User.findById(id)
        const comparePassword = await bcrypt.compare(currentPassword,foundUser.password)
        if(comparePassword !== true){
            return res.status(400).json({error:"La contraseña actual no coincide"})
        }
        if(newPassword === confirmNewPassword){
            const hashNewPassword = await bcrypt.hash(newPassword,10)
            foundUser.password = hashNewPassword
            await foundUser.save()
             res.status(201).json({message:"La contraseña se cambio con exito"})
        }
         res.status(400).json({error:"Verifica que tu nueva contraseña coincida"})
      } catch (error) {
        
      }
    }
    



}


export default userController