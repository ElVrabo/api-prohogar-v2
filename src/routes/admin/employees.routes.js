import { Router } from "express";
import { createEmployee, deleteEmployee, editEmployee, filterEmployee, getEmployees } from "../../controllers/employees.controller.js";


const employeesRoutes = Router()

employeesRoutes.get('/employees',getEmployees)
employeesRoutes.post('/employees',createEmployee)
employeesRoutes.delete('/employees/:id',deleteEmployee)
employeesRoutes.put('/employees/:id', editEmployee)
employeesRoutes.get('/filterEmployees', filterEmployee)
export default employeesRoutes