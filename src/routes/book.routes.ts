import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controller';

const router = express.Router();
const path = 'book' // Base path for book routes

// book Routes
router.post(`/${path}`, createBook); // Create an book
router.get(`/${path}`, getAllBooks); // Get all books
router.get(`/${path}/:id`, getBookById); // Get an book by ID
router.put(`/${path}/:id`, updateBook); // Update an book by ID
router.delete(`/${path}/:id`, deleteBook); // Delete an book by ID



export default router;
