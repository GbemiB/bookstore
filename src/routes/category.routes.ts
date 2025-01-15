import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/category.controller';

const router = express.Router();
const path = 'category'  // Base path for category routes

// Category Routes
router.post(`/${path}`, createCategory); // Create a category
router.get(`/${path}`, getAllCategories); // Get all categories
router.get(`/${path}/:id`, getCategoryById); // Get a category by ID
router.put(`/${path}/:id`, updateCategory); // Update a category by ID
router.delete(`/${path}/:id`, deleteCategory); // Delete a category by ID

export default router;
