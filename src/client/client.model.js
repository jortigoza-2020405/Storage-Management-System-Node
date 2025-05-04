import { Schema, model } from 'mongoose'

const clientSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      maxLength: [50, 'Client name cannot exceed 50 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      minLength: [8, 'Phone must be at least 8 characters'],
      maxLength: [15, 'Phone cannot exceed 15 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    address: {
      type: String,
      maxLength: [100, 'Address cannot exceed 100 characters']
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

clientSchema.methods.toJSON = function () {
  const { __v, _id, ...client } = this.toObject()
  client.id = _id
  return client
}

export default model('Client', clientSchema)