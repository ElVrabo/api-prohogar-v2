import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees } from "../../controllers/employees.controller.js";

const employeesRoutes = Router()

employeesRoutes.get('/employees',getEmployees)
employeesRoutes.post('/employees',createEmployee)
employeesRoutes.delete('/employees/:id',deleteEmployee)

export default employeesRoutes