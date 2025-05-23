import Product from '../product/product.model.js'
import Movement from './movement.model.js'

// Registrar movimiento (entrada o salida)
export const registerProductMovement = async (req, res) => {
	try {
		const { product, type, quantity, description } = req.body

		// Validación de campos
		if (!product || !type || !quantity || !description) {
			return res.status(400).send({
				success: false,
				message: 'Todos los campos son obligatorios: product, type, quantity, description'
			})
		}

		if (!['entry', 'exit'].includes(type)) {
			return res.status(400).send({
				success: false,
				message: 'El tipo debe ser "entry" o "exit"'
			})
		}

		const quantityNum = parseInt(quantity, 10)
		if (isNaN(quantityNum) || quantityNum <= 0) {
			return res.status(400).send({
				success: false,
				message: 'La cantidad debe ser un número mayor a 0'
			})
		}

		const foundProduct = await Product.findById(product)
		if (!foundProduct) {
			return res.status(404).send({
				success: false,
				message: 'Producto no encontrado'
			})
		}

		if (type === 'exit' && foundProduct.stock < quantityNum) {
			return res.status(400).send({
				success: false,
				message: 'No hay suficiente stock para realizar la salida'
			})
		}

		// Actualizar stock
		if (type === 'entry') {
			foundProduct.stock += quantityNum
		} else {
			foundProduct.stock -= quantityNum
		}

		await foundProduct.save()

		// Crear movimiento
		const movement = new Movement({
			product,
			type,
			quantity: quantityNum,
			description,
			date: new Date()
		})

		await movement.save()

		return res.status(201).send({
			success: true,
			message: 'Movimiento registrado correctamente',
			movement
		})
	} catch (error) {
		console.error(' Error al registrar movimiento:', error)
		return res.status(500).send({
			success: false,
			message: 'Error interno al registrar el movimiento',
			error: error.message
		})
	}
}


// Obtener historial de movimientos por producto
export const getProductMovementHistory = async (req, res) => {
	try {
		const { productId } = req.params

		const movements = await Movement.find({ product: productId })
			.populate('product', 'productName price category')
			.sort({ date: -1 })

		if (!movements.length) {
			return res.status(404).send({
				success: false,
				message: 'No se encontraron movimientos para este producto'
			})
		}

		return res.send({
			success: true,
			message: 'Historial recuperado correctamente',
			movements
		})
	} catch (error) {
		console.error(' Error al obtener historial:', error)
		return res.status(500).send({
			success: false,
			message: 'Error al recuperar historial de movimientos',
			error: error.message
		})
	}
}
