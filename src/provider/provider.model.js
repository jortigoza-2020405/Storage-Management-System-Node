import { Schema, model } from "mongoose";

const providerSchema = new Schema(
  {
    nameProvider: {
      type: String,
      required: [true, 'The name of provider is required'],
      maxlength: [25, `The name can't exceed 25 characters`],
    },
    NIT: {
      type: String,
      required: [true, `NIT is required`],
      maxlength: [8, `NIT can't exceed 8 characters`],
      unique: true,
    },
    contactProvider: {
      type: String,
      required: [true, `Contact is required`],
      maxlength: [50, `Contact can't exceed 50 characters`],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      minlength: [8, 'Phone must be at least 8 digits'],
      maxlength: [13, 'Phone number can\'t exceed 13 digits'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    productsSupplied: [{
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }],
  },
  { timestamps: true }
);

providerSchema.methods.toJSON = function () {
  const { __v, _id, ...provider } = this.toObject();
  return provider;
};

export default model('Provider', providerSchema);

