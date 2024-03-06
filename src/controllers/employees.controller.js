import Employees from "../models/employees.model.js"
export const getEmployees = async(req,res)=>{
  try {
    const foundEmployees = await Employees.find()
    if(foundEmployees.length === 0){
      res.status(404).json({error:"No se encontro ningun empleado aun"})
    }
    res.status(200).json(foundEmployees)
  } catch (error) {
    
  }
}

export const createEmployee = async(req,res)=>{
   const {username,age,phone,rol,date} = req.body
   try {
    if(!username || !age ||!phone || !rol ){
      return res.status(400).json({error:"Debes llenar todos los campos porfavor"})
    }
    const newEmployee = new Employees({
        username,
        age,
        phone,
        rol,
        date
      })  
     const saveEmployee = await newEmployee.save()
     res.status(201).json({message:"El empleado se creo correctamente"}) 
   } catch (error) {
   }
  
}

export const deleteEmployee = async(req,res)=>{
   const employeeID = req.params.id
   try {
    const foundEmployee = await Employees.findByIdAndDelete(employeeID)
    if(!foundEmployee){
        res.status(400).json({error:"El empleado no se encontro"})
    }
     res.status(201).json({message:"Se elimino correctamente el empleado"})
   } catch (error) {
    
   }
}

export const editEmployee = async(req,res)=>{
  const employeeID = req.params.id
  const {username,age,phone,rol} = req.body
  const bodyEmployee = {
    username,
    age,
    phone,
    rol
  }
  try {
    await Employees.findByIdAndUpdate(
    employeeID,
    bodyEmployee,
    {new:true}
   )
   res.status(200).json({message:"El empleado se actualizo con exito"})
  } catch (error) {
    
  }
}
export const filterEmployee = async (req,res)=>{
  const employee = req.query.employee
  try {
  
      const regex = new RegExp(employee,'i')
      const foundEmployees = await Employees.find({username: regex})
      if(!foundEmployees || foundEmployees.length === 0){
      res.status(404).json({error:"No se encontro al empleado"})
      return 
      }else{
    
        res.status(200).json(foundEmployees)
      }
   
  } catch (error) {
    
  }
}
