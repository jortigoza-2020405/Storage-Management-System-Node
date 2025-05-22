import Product from '../product/product.model.js'
import Movement from './movement.model.js'

//Registrar movimiento de producto (entrada o salida)
export const registerProductMovement = async (req, res) => {
	try {
		const { productId, type, quantity, description } = req.body

		if (!productId || !type || !quantity || !description)
			return res.status(400).send
			(
				{
					success: false,
					message: 'All fields are required (productId, type, quantity, description)'
				}
			)

		if (!['entry', 'exit'].includes(type))
			return res.status(400).send
			(
				{
					success: false,
					message: 'Type must be either "entry" or "exit"'
				}
			)

		const quantityNum = parseInt(quantity, 10)
		if (isNaN(quantityNum) || quantityNum <= 0)
			return res.status(400).send
			(
				{
					success: false,
					message: 'Quantity must be a positive number'
				}
			)

		const product = await Product.findById(productId)
		if (!product)
			return res.status(404).send
			(
				{
					success: false,
					message: 'Product not found'
				}
			)

		product.stock = parseInt(product.stock, 10)

		if (type === 'entry') {
			product.stock += quantityNum
		} else if (type === 'exit') {
			if (product.stock < quantityNum)
				return res.status(400).send
				(
					{
						success: false,
						message: 'Not enough stock to complete this movement'
					}
				)

			product.stock -= quantityNum
		}

		await product.save()

		const movement = new Movement
		(
			{
				product: productId,
				type,
				quantity: quantityNum,
				description,
				date: new Date()
			}
		)

		await movement.save()

		return res.send
		(
			{
				success: true,
				message: 'Movement registered successfully',
				movement
			}
		)
	} catch (error) {
		console.error(error)
		return res.status(500).send
		(
			{
				success: false,
				message: 'Error registering movement',
				error
			}
		)
	}
}

//Obtener historial de movimientos por producto
export const getProductMovementHistory = async (req, res) => {
	try {
		const { productId } = req.params

		const movements = await Movement.find({ product: productId })
			.populate('product', 'productName price category')
			.sort({ date: -1 })

		if (!movements.length)
			return res.status(404).send
			(
				{
					success: false,
					message: 'No movements found for this product'
				}
			)

		return res.send
		(
			{
				success: true,
				message: 'Product movement history retrieved successfully',
				movements
			}
		)
	} catch (error) {
		console.error(error)
		return res.status(500).send
		(
			{
				success: false,
				message: 'Error retrieving product movement history',
				error
			}
		)
	}
}
