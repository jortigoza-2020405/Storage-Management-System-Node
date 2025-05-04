import { Router } from 'express'
import {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from './category.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

// Crear una nueva categoría (solo ADMIN)
api.post(
    '/add',
    [validateJwt, isAdmin],
    addCategory
)

// Obtener todas las categorías 
api.get(
    '/getAll',
    [validateJwt],
    getAllCategories
)

// Obtener una categoría por nombre 
api.get(
    '/:name',
    [validateJwt],
    getCategory
)

// Actualizar una categoría por ID (solo ADMIN)
api.put(
    '/:id',
    [validateJwt, isAdmin],
    updateCategory
)

// Eliminar una categoría por ID (solo ADMIN)
api.delete(
    '/:id',
    [validateJwt, isAdmin],
    deleteCategory
)

export default api