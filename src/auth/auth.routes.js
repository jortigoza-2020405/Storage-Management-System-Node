//Rutas de Administrador
import { Router } from 'express'
import { 
    deleteUser,
    getAllClient,
    getClient,
    loginAdmin,
    registerAdmin,
    test,
    updateUser
 } from './auth.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { categoryValidator, loginValidator, productValidator, providerValidator, registerValidator } from '../../helpers/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.error.js'
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../category/category.controller.js'
import { addProduct, applyOfferToProduct, deleteProduct, getAllProducts, getInventoryControl, getOutOfStockProducts, getProduct, getTopSellingProducts, updateProduct } from '../product/product.controller.js'
import { registerProvider } from '../provider/provider.controller.js'
const api = Router()

//Rutas privadas

api.get('/test', validateJwt, test)

api.post(
    '/register', 
    [
        registerValidator,
        deleteFileOnError
    ], 
    registerAdmin
)

api.post(
    '/login', 
    [
        loginValidator
    ], 
    loginAdmin
)

api.put(
    '/updateUser/:id',
    [validateJwt],
    updateUser
)

api.delete(
    '/deleteUser/:id',
    [validateJwt],
    deleteUser
)

// Obtener todos 

api.get('/allClients/',
    [validateJwt],
    getAllClient
)

api.get(
    '/getOne/:id',
    [validateJwt],
    getClient
)


export default api