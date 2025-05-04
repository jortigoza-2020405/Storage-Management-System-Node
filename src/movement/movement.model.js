import { Schema, model } from "mongoose";

const movementSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true 
  },
  type: {
    type: String,
    enum: ['entry', 'exit'],
    required: [true, 'Type is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1 
  },
  date: {
    type: Date,
    default: Date.now 
  },
  description: {
    type: String,
    required: [true, 'Description is required'] 
  }
});

export default model('Movement', movementSchema);

