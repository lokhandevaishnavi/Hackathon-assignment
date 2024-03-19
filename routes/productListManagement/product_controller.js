const express = require('express');
const router = express.Router();
const Product = require('../productListManagement/product_model.js').addProduct 


//post Product
router.post('/product', async (req, res) => {
    try {
        const { productTitle, description, productPic, productStatus } = req.body;
        const newProduct = new Product({
            productTitle,
            description,
            productPic,
            productStatus
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get Product
router.get('/getProduct', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//get product byID
router.get('/getProduct/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a product by ID
router.put('/updateProduct/:id', async (req, res) => {
    try {
        const { productTitle, description, productPic, productStatus } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                productTitle,
                description,
                productPic,
                productStatus
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product is updated successfully", updatedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Delete a Product by ID
router.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product is deleted", deletedProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;