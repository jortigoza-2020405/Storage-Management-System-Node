// Modelo de Categoria

import {Schema, model} from 'mongoose'

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
            unique: true,
        },
        description: {
            type: String,
            required: [false, 'description is not required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
    },
    {
        timestamps: true
    }
)

export default model('Category', categorySchema)