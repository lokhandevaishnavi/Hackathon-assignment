const express = require('express');
const router = express.Router();
const Category = require('../categoryManagment/category_model.js').addCategory 
// Create a new category
router.post('/category', async (req, res) => {
    try {
        const { categoryName, description, categoryStatus } = req.body;
        const newCategory = new Category({
            categoryName,
            description,
            categoryStatus: categoryStatus || "Inactive",
        });
        const savedCategory = await newCategory.save();
        res.json(savedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all categories
router.get('/getCategory', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a category by ID
router.put('/updateCategory/:id', async (req, res) => {
    try {
        const { categoryName, description, categoryStatus } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                categoryName,
                description,
                categoryStatus: categoryStatus || "Inactive",
            },
            { new: true } 
        );
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a category by ID
router.delete('/deleteCategory/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndRemove(req.params.id);
        res.json(deletedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;