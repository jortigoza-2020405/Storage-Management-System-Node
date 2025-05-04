//Modelo de administrador

import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {  
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        username: {
            type: String,
            required: [false, 'Username is required'],
            unique: true,
            maxLength: [100, `Can't be overcome 15 characters`], // dejarlo en 100
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'], 
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        phone: {
            type: String,
            required: [false, 'Phone is required'],
            maxLength: [13, `Can't be overcome 8 numbers`],
            minLength: [8, 'Phone must be 8 numbers']
        },
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN', 'EMPLOYER'] 
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
      }
)

userSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject() 
    return user
}

//Crear y exportar el modelo
export default model('User', userSchema)