import Client from './client.model.js'

// Crear un nuevo cliente
export const addClient = async (req, res) => {
  try {
    let data = req.body
    let client = new Client(data)

    await client.save()

    return res.send
      (
        {
          success: true,
          message: `${client.name} saved successfully`,
          client
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error adding client',
          error
        }
      )
  }
}

// Obtener todos los clientes activos
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ status: true })

    if (clients.length === 0) return res.status(404).send
      (
        {
          message: 'No clients found',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Clients found',
          clients
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error retrieving clients',
          error
        }
      )
  }
}

// Obtener cliente por ID
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params

    const client = await Client.findById(id)

    if (!client || client.status === false) return res.status(404).send
      (
        {
          message: 'Client not found or is inactive',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Client found',
          client
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error retrieving client',
          error
        }
      )
  }
}

// Actualizar cliente
export const updateClient = async (req, res) => {
  try {
    let id = req.params.id
    let data = req.body

    const client = await Client.findById(id)

    if (!client || client.status === false) return res.status(404).send
      (
        {
          message: 'Client not found or is inactive',
          success: false
        }
      )

    const updatedClient = await Client.findByIdAndUpdate
      (
        id,
        data,
        { new: true }
      )

    return res.send
      (
        {
          success: true,
          message: 'Client updated successfully',
          updatedClient
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error updating client',
          error
        }
      )
  }
}

// Eliminar cliente (lógicamente)
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params

    const client = await Client.findById(id)

    if (!client || client.status === false) return res.status(404).send
      (
        {
          message: 'Client not found or already inactive',
          success: false
        }
      )

    client.status = false
    await client.save()

    return res.send
      (
        {
          success: true,
          message: 'Client marked as inactive',
          client
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error deleting client',
          error
        }
      )
  }
}