//Configurar el servidor express (HTTP)
'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'

import adminRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import providerRoutes from '../src/provider/provider.routes.js'
import clientRoutes from '../src/client/client.routes.js'
import movementRoutes from '../src/movement/movement.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
    
}

 
export const initServer = async()=>{
    const app = express()
    try {
        configs(app) 
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
        
    } catch (err) {
        console.error('Servidor init failed', err)
    }
}

const routes = (app)=>{
    app.use('/v1/admin', adminRoutes) 
    app.use('/v1/employer',userRoutes)
    app.use('/v1/products', productRoutes)
    app.use('/v1/categories', categoryRoutes)
    app.use('/v1/providers', providerRoutes)
    app.use('/v1/clients', clientRoutes)
    app.use('/v1/movements', movementRoutes)
}