// rutas de cliente

import { Router } from 'express'
import {updateUser, deleteUser, updatePass, registerUser, loginUser, test } from './user.controller.js'
import {  validateJwtEmployee } from '../../middlewares/validate.jwt.js'
import { newPasswordValidation, registerValidatorEmployee} from '../../helpers/validators.js'
import { loginValidator } from '../../helpers/validators.js'
import { deleteFileOnError } from '../../middlewares/delete.file.error.js'
import { getTopSellingProducts, getProduct, getProductsByCategory } from '../product/product.controller.js'
const api = Router()

api.get('/test', validateJwtEmployee, test)


// Rutas públicas

api.post(
    '/register', 
    [
        //registerValidatorEmployee,  
        deleteFileOnError
    ], 
    registerUser
)

api.post(
    '/login', 
    [
        loginValidator
    ], 
    loginUser
)

// Interracciones con productos
api.get(
    '/getTopSellingProducts/',
    [validateJwtEmployee],
    getTopSellingProducts
)



api.get('/product/:name', 
    [validateJwtEmployee], 
    getProduct
)

api.get('/getProductsByCategory/:name', [validateJwtEmployee], getProductsByCategory);


//Rutas privadas (Require el estar logeado)

api.put('/:id',
    [validateJwtEmployee],
    updateUser
)

api.delete('/:id',
    [validateJwtEmployee],
    deleteUser
)
 api.put('/update-pass/:id',
    [validateJwtEmployee],
    [newPasswordValidation],
    updatePass
)

api.put(
    '/updateUserSettings/:id',
    [validateJwtEmployee],
    updateUser
)

api.delete('/deleteMyAccount/:id',
    [validateJwtEmployee],
    deleteUser
)

export default api