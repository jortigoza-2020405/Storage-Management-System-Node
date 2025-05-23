import { Router } from 'express'
import {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategoryAndDate,
    getProductsByCategory,
    getInventoryControl,
    getOutOfStockProducts,
    getTopSellingProducts,
    applyOfferToProduct
} from './product.controller.js'

import { validateJwt, isAdmin, validateJwtEmployee } from '../../middlewares/validate.jwt.js'

const api = Router()

// Crear un producto (solo ADMIN)
api.post(
    '/addProduct',
    [validateJwt],
    addProduct
)

// Interracciones con productos
api.get(
    '/getTopSellingProducts/',
    [validateJwt],
    getTopSellingProducts
)


// Obtener productos por categoría y fecha
api.get(
    '/byCategoryAndDate',
    [validateJwt],
    getProductsByCategoryAndDate
)

// Obtener control de inventario (solo ADMIN)
api.get(
    '/InventoryControl',
    [validateJwt, isAdmin],
    getInventoryControl
)

// Obtener todos los productos 
api.get(
    '/products',
    [validateJwt],
    getAllProducts
)

// Actualizar un producto por ID (solo ADMIN)
api.put(
    '/productUpdate/:id',
    [validateJwt, isAdmin],
    updateProduct
)

api.get('/:name', 
    [validateJwt], 
    getProduct
)

// Eliminar un producto con confirmación (solo ADMIN)
api.delete(
    '/delete/:id',
    [validateJwt, isAdmin],
    deleteProduct
)

// Aplicar una oferta a un producto 
api.put(
    '/addProductOffer/:id',
    [validateJwt],
    applyOfferToProduct
)

// Obtener productos sin stock 
api.get(
    '/OutOfStockProducts/',
    [validateJwt],
    getOutOfStockProducts
)

// Obtener productos más vendidos 
api.get(
    '/getTopSellingProducts',
    [validateJwt],
    getTopSellingProducts
)

// Obtener productos por nombre de categoría 
api.get(
    '/category/:name',
    [validateJwt],
    getProductsByCategory
)

api.get('/product/:name', 
    [validateJwt], 
    getProduct
)

api.get('/getProductsByCategory/:name', [validateJwt], getProductsByCategory);


export default api
