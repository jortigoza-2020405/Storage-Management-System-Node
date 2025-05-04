'use strict'

import jwt from 'jsonwebtoken'
import { findEmployer, findUser } from '../helpers/db.validators.js'

export const validateJwt = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        const validateUser = await findUser(user.uid)
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - Unauthorized'
            }
        )
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}

export const isAdmin = (req, res, next) => {
    try {
      if (req.user?.role !== 'ADMIN') {
        return res.status(403).send({
          message: 'Access denied. Admins only',
          success: false
        })
      }
      next()
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: 'Error checking admin role', success: false })
    }
  }
  

export const validateJwtEmployee = async(req, res, next)=>{
    try{
        let secretKey = process.env.SECRET_KEY
        let { authorization } = req.headers
        if(!authorization) return res.status(401).send({message: 'Unauthorized'})
        let user = jwt.verify(authorization, secretKey)
        const validateUser = await findEmployer(user.uid)
        if(!validateUser) return res.status(404).send(
            {
                success: false,
                message: 'User not found - Unauthorized'
            }
        )
        req.user = user
        next()
    }catch(err){
        console.error(err)
        return res.status(401).send({message: 'Invalid token or expired'})
    }
}