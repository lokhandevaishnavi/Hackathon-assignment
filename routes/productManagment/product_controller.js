const express = require('express');
const router = express.Router();
const Product = require('../categoryManagment/category_model.js').addProduct

router.post('/products', async (req, res) => {
    try {
        const {
            categoryId,
            productName,
            packSize,
            categoryName,
            price,
            photos,
        } = req.body;

        const newProduct = new Product.addProduct({
            categoryId,
            productName,
            packSize,
            categoryName,
            price,
            photos,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});
router.get('/products', async (req, res) => {
    try {
        const products = await Product.addProduct.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.addProduct.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProductData = req.body;
        const updatedProduct = await Product.addProduct.findByIdAndUpdate(productId, updatedProductData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.addProduct.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;