import { Router } from 'express'
import {
  addClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} from './client.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { clientValidator } from '../../helpers/validators.js'

const api = Router()

// Crear cliente (solo ADMIN)
api.post(
    '/add',
    [ validateJwt, clientValidator, isAdmin ],
    addClient
  )
// Obtener todos los clientes activos 
api.get(
  '/all',
  [validateJwt],
  getAllClients
)

// Obtener cliente por ID 
api.get(
  '/get/:id',
  [validateJwt],
  getClientById
)

// Actualizar cliente por ID (solo ADMIN)
api.put(
  '/update/:id',
  [validateJwt, clientValidator, isAdmin],
  updateClient
)

// Eliminar cliente 
api.delete(
  '/delete/:id',
  [validateJwt, isAdmin],
  deleteClient
)

export default api