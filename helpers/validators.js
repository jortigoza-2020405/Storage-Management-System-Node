//Validar campos en las rutas
import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors, validateErrorWithoutImg } from "./validate.error.js"
import { existUsername, existEmail, existCategory,  existProduct, existEmailEmployee, existUsernameEmployee, existProvider } from "./db.validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]


export const registerValidatorEmployee = [        
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail()
        .custom(existEmailEmployee),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsernameEmployee),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('userLoggin', 'Username or email cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrorWithoutImg
]

export const newPasswordValidation = [
    body('newPassword', 'NewPassword cannot be empty').notEmpty().isStrongPassword().isLength({min: 8}),
    validateErrorWithoutImg

]

export const categoryValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty().custom(existCategory),
    body('description', 'Description cannot be empty')
        .notEmpty(),
        validateErrorWithoutImg
]

export const productValidator = [
    body('productName', 'Product name cannot be empty')
        .notEmpty().custom(existProduct),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    body('price', 'Price cannot be empty or is not a valid')
        .notEmpty(),
    body('stock', 'Stock cannot be empty')
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .notEmpty(),
    body('brand', 'Brand cannot be empty')
        .notEmpty(),
    body('dateEntry', 'Date of entry is required')
        .notEmpty(),
    validateErrors
]



export const providerValidator = [
    body('nameProvider', 'Product name cannot be empty')
    .notEmpty().custom(existProvider),
body('NIT', 'Description cannot be empty')
    .notEmpty(),
body('contactProvider', 'Price cannot be empty or is not a valid')
    .notEmpty(),
body('phone', 'Stock cannot be empty')
    .notEmpty(),
body('email', 'Category cannot be empty')
    .notEmpty(),
validateErrors
]

export const clientValidator = [
    body('name', 'Client name cannot be empty')
      .notEmpty()
      .isLength({ max: 50 }),
  
    body('phone', 'Phone is required and must be valid')
      .notEmpty()
      .isLength({ min: 8}),
  
    body('email', 'Email is required and must be valid')
      .notEmpty()
      .isEmail(),
  
    body('address', 'Address must be less than 100 characters')
      .optional()
      .isLength({ max: 100 }),
    validateErrors
]
  