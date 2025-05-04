//Rutas de Administrador
import { Router } from 'express'
import {
  registerProvider,
  getAllProviders,
  getProvider,
  updateProvider,
  deleteProvider
} from './provider.controller.js'

const api = Router()

api.post('/addProvider', registerProvider)
api.get('/providers', getAllProviders)
api.get('/findByName/:nameProvider', getProvider)
api.put('/updateProvider/:id', updateProvider)
api.delete('/deleteProvider/:id', deleteProvider)

export default api