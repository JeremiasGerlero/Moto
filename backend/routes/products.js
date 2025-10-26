const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ← Asegúrate que apunte correctamente

// GET /api/products - Obtener todos
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Obteniendo productos...');
    console.log('📦 Modelo Product:', typeof Product); // Para debug
    
    const products = await Product.find();
    console.log(`✅ Productos encontrados: ${products.length}`);
    res.json(products);
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/products - Crear producto
router.post('/', async (req, res) => {
  try {
    console.log('📦 Datos recibidos:', req.body);

    const newProduct = new Product({
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      precio: Number(req.body.precio),
      descripcion: req.body.descripcion,
      imagen: imageUrl,
    });

    const saved = await newProduct.save();
    console.log('✅ Producto guardado:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error al crear producto:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id - Actualizar producto
router.put('/:id', async (req, res) => {
  try {
    console.log('✏️ Actualizando producto:', req.params.id);

    const updateData = {
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      precio: Number(req.body.precio),
      descripcion: req.body.descripcion,
      imagen: imageUrl,
    };

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    console.log('✅ Producto actualizado');
    res.json(updated);
  } catch (err) {
    console.error('❌ Error al actualizar:', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id - Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    console.log('🗑️ Eliminando producto:', req.params.id);
    
    const deleted = await Product.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    console.log('✅ Producto eliminado');
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    console.error('❌ Error al eliminar:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;