// routes/movement.routes.js

import { Router } from 'express'
import { registerProductMovement, getProductMovementHistory } from '../movement/movement.controller.js'
import { validateJwt, validateJwtEmployee } from '../../middlewares/validate.jwt.js'

const api = Router()

// Ruta para registrar movimientos (entrada/salida)
api.post('/registerMovement', [validateJwtEmployee], registerProductMovement)

// Ruta para registrar movimientos (entrada/salida)
api.post('/registerMovementAdmin', [validateJwt], registerProductMovement)

// Obtener historial de movimientos de un producto
api.get('/history/:productId', [validateJwtEmployee], getProductMovementHistory);



export default api
