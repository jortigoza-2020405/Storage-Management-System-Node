//Controlador de Producto
import Product from './product.model.js'
import Category from '../category/category.model.js'

//Añadir un producto (Administrador)
export const addProduct = async (req, res) => {
  try {
    let data = req.body
    let product = new Product(data)

    await product.save()

    return res.send
      (
        {
          success: true,
          message: `${product.productName}, with id ${product.id} saved successfully`
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'General error when adding product',
          error
        }
      )
  }
}


//Oferta de un Producto (Administrador)
export const applyOfferToProduct = async (req, res) => {
  try {
    let id = req.params.id
    let { discount, offerExpiryDate } = req.body

    const product = await Product.findById(id)

    if (!product) return res.status(404).send
      (
        {
          message: 'Product not found',
          success: false
        }
      )

    const originalPrice = product.price
    const discountedPrice = originalPrice - (originalPrice * (discount / 100))

    product.offer = true
    product.originalPrice = originalPrice
    product.discount = discount
    product.discountedPrice = discountedPrice
    product.offerExpiryDate = new Date(offerExpiryDate)

    await product.save()

    return res.send
      (
        {
          success: true,
          message: 'Offer applied successfully',
          product
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error applying offer',
          error
        }
      )
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query

    const products = await Product.find
      (
        { status: true }
      )
      .skip(skip)
      .limit(limit)

    if (products.length === 0) return res.status(404).send
      (
        {
          message: 'Products not found',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Products found',
          products,
          total: products.length
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'General error getting products',
          error
        }
      )
  }
}


export const getProduct = async (req, res) => {
  try {
    const { name } = req.params

    const products = await Product.find
      (
        {
          productName: new RegExp(name, 'i')
        }
      )

    if (products.length === 0) return res.status(404).send
      (
        {
          message: 'No products found',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Products found',
          products
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error finding products by name',
          error
        }
      )
  }
}

// Actualizar un producto (Administrador)

export const updateProduct = async (req, res) => {
  try {
    let id = req.params.id
    let data = req.body

    const product = await Product.findById(id)

    if (!product || product.status === false) return res.status(404).send
      (
        {
          message: 'Product not found or is inactive',
          success: false
        }
      )

    const updatedProduct = await Product.findByIdAndUpdate
      (
        id,
        data,
        { new: true }
      )

    return res.send
      (
        {
          message: 'Product updated successfully',
          updatedProduct,
          success: true
        }
      )
  } catch (error) {
    console.error('General error', error)
    return res.status(500).send
      (
        {
          message: 'Error updating product',
          error,
          success: false
        }
      )
  }
}


// Obtener el control de inventario (Administrador)

export const getInventoryControl = async (req, res) => {
  try {
    const products = await Product.find().select('productName stock')

    if (!products || products.length === 0) return res.status(404).send
      (
        {
          message: 'No products found in inventory',
          success: false
        }
      )

    return res.send
      (
        {
          message: 'Inventory control fetched successfully',
          products,
          success: true
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error fetching inventory control',
          error
        }
      )
  }
}

// Obtener productos que no tengan Stock o disponibilidad (Administrador)

export const getOutOfStockProducts = async (req, res) => {
  try {
    const outOfStockProducts = await Product.find
      (
        { stock: 0 }
      )

    if (outOfStockProducts.length === 0) return res.status(404).send
      (
        {
          message: 'No out of stock products found',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Out of stock products found',
          outOfStockProducts
        }
      )
  } catch (error) {
    console.error('Error fetching out of stock products:', error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error fetching out of stock products',
          error
        }
      )
  }
}

// Obtener los productos que han sido más vendidos (Administrador y Cliente)

export const getTopSellingProducts = async (req, res) => {
  try {
    const topProducts = await Product.find()
      .sort({ salesCount: -1 })
      .limit(10)

    if (topProducts.length === 0) return res.status(404).send
      (
        {
          message: 'No top selling products found',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Top selling products retrieved successfully',
          products: topProducts
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error fetching top selling products',
          error
        }
      )
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { justification } = req.body; 

    
    if (!justification) {
      return res.status(400).send({
        message: 'Justification is required to deactivate the product.',
        success: false
      });
    }

    
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).send({
        message: 'Product not found',
        success: false
      });
    }

 
    product.deactivationReason = justification; 
    product.status = false; 

   
    await product.save();

    return res.send({
      message: 'Product is inactive',
      success: true,
      product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: 'Error updating product status',
      error,
      success: false
    });
  }
};



  // Obtener productos filtrados por el nombre de la categoría (Cliente)

export const getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.name

    const category = await Category.findOne
      (
        {
          name: { $regex: new RegExp(`^${categoryName}$`, 'i') }
        }
      )

    if (!category) return res.status(404).send
      (
        {
          message: 'Category not found',
          success: false
        }
      )

    const products = await Product.find
      (
        {
          category: category._id
        }
      )

    if (!products || products.length === 0) return res.status(404).send
      (
        {
          message: 'No products found in this category',
          success: false
        }
      )

    return res.send
      (
        {
          success: true,
          message: 'Products retrieved successfully',
          products
        }
      )
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return res.status(500).send
      (
        {
          success: false,
          message: 'Error fetching products by category',
          error
        }
      )
  }
}

// filtrar productos por categoria y fecha

export const getProductsByCategoryAndDate = async (req, res) => {
  try {

    const { categoryId, fechaInicio, fechaFin } = req.body
    console.log(categoryId)
    if (!categoryId) return res.status(400).send(
        {
          message: 'Category ID is required',
          success: false
        }
      )

    const category = await Category.findById(categoryId)
    if (!category) return res.status(404).send(
        { 
          message: 'Category not found', 
          success: false 
        }
      )

    const query = {
      category: category._id,
      dateEntry: {}
    }

    // condiciones de fecha
    if (fechaInicio) query.dateEntry.$gte = new Date(fechaInicio) // >= 
    if (fechaFin) query.dateEntry.$lte = new Date(fechaFin) // <=

    if (!query.dateEntry.$gte && !query.dateEntry.$lte) delete query.dateEntry

    const products = await Product.find(query)

    if (products.length === 0) return res.status(404).send(
        { 
          message: 'No products found with these filters', 
          success: false 
        }
      )

    return res.send
      (
        { 
          success: true, 
          message: 'Products filtered successfully', 
          products 
        }
      )
  } catch (error) {
    console.error(error)
    return res.status(500).send
      (
        { 
          success: false,
          message: 'Error filtering products', 
          error
        }
      )
  }
}