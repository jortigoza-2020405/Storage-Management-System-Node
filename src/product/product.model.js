import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    productName: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [25, `Can't be overcome 25 characters`],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minLength: [25, 'description must be at least 50 characters'],
      maxLength: [100, `Can't be overcome 100 characters`],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock must be greater than or equal to 0'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
    },
    dateEntry: {
      type: Date,
      default: Date.now
    },
    status: {
      type: Boolean,
      default: true
    },
    offer: {
      type: Boolean,
      default: false,
    },
    originalPrice: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
    },
    offerExpiryDate: {
      type: Date,
    },
    salesCount: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
)

export default model('Product', productSchema);