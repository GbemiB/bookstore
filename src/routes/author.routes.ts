import express from 'express';
import {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author.controller';

const router = express.Router();
const path = 'author'; // Base path for author routes

// Author Routes
router.post(`/${path}`, createAuthor); // Create an author
router.get(`/${path}`, getAllAuthors); // Get all authors
router.get(`/${path}/:id`, getAuthorById); // Get an author by ID
router.put(`/${path}/:id`, updateAuthor); // Update an author by ID
router.delete(`/${path}/:id`, deleteAuthor); // Delete an author by ID

export default router;
