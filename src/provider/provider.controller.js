//Controlador de Proveedor
import Provider from '../provider/provider.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

//test
export const test = (req, res) => {
	console.log('test is running')
	return res.send
	(
		{
			message: 'Test is running'
		}
	)
}

//Registro de Proveedor
export const registerProvider = async (req, res) => {
	try {
		let data = req.body
		let provider = new Provider(data)

		await provider.save()

		return res.send
		(
			{
				success: true,
				message: `${provider.nameProvider}, with id ${provider.id} saved successfully`
			}
		)
	} catch (error) {
		console.error(error)
		return res.status(500).send
		(
			{
				success: false,
				message: 'General error when creating provider',
				error
			}
		)
	}
}

//Obtener todos los proveedores
export const getAllProviders = async (req, res) => {
	try {
		const { limit = 20, skip = 0 } = req.query
		const provider = await Provider.find().skip(skip).limit(limit)

		if (provider.length === 0) return res.status(404).send
		(
			{
				message: 'Providers not found',
				success: false
			}
		)

		return res.send
		(
			{
				success: true,
				message: 'Providers found:',
				provider,
				total: provider.length
			}
		)
	} catch (error) {
		console.error(error)
		return res.status(500).send
		(
			{
				success: false,
				message: 'General error',
				error
			}
		)
	}
}

//Obtener proveedor por nombre
export const getProvider = async (req, res) => {
	try {
		const { nameProvider } = req.params
		const provider = await Provider.findOne
		(
			{ nameProvider: new RegExp('^' + nameProvider + '$', 'i') }
		)

		if (!provider) return res.status(404).send
		(
			{
				success: false,
				message: 'Provider not found'
			}
		)

		return res.send
		(
			{
				success: true,
				message: 'Provider found',
				provider
			}
		)
	} catch (error) {
		console.error(error)
		return res.status(500).send
		(
			{
				message: 'General error',
				error,
				success: false
			}
		)
	}
}

//Actualizar proveedor
export const updateProvider = async (req, res) => {
	try {
		let id = req.params.id
		let data = req.body

		let updatedProvider = await Provider.findByIdAndUpdate
		(
			id,
			data,
			{ new: true }
		)

		if (!updatedProvider) return res.status(404).send
		(
			{
				message: 'Provider not found and not updated',
				success: false
			}
		)

		return res.send
		(
			{
				message: 'Provider updated successfully',
				updatedProvider,
				success: true
			}
		)
	} catch (error) {
		console.error('General error', error)
		return res.status(500).send
		(
			{
				message: 'General error',
				error,
				success: false
			}
		)
	}
}

//Eliminar proveedor
export const deleteProvider = async (req, res) => {
	try {
		let id = req.params.id

		let deletedProvider = await Provider.findByIdAndDelete({ _id: id })

		if (!deletedProvider) return res.status(404).send
		(
			{
				message: 'Provider not found, not deleted',
				success: false
			}
		)

		return res.send
		(
			{
				message: 'Deleted Provider successfully',
				deletedProvider,
				success: true
			}
		)
	} catch (error) {
		console.error('General error', error)
		return res.status(500).send
		(
			{
				message: 'General error',
				error,
				success: false
			}
		)
	}
}
