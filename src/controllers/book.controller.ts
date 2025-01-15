import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import ResponseHelper from '../utils/response';
import ValidationHelper from '../utils/validation';
import Transformer from '../utils/transformer';

const bookService = new BookService();

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, authorId, categoryId, publicationYear, ISBN } = req.body;
    if (!ValidationHelper.checkRequiredFields(req.body, ['title', 'authorId', 'categoryId','publicationYear', 'ISBN' ], res)) return;
    const newBook = await bookService.createBook({ title, authorId, categoryId, publicationYear, ISBN });
    ResponseHelper.handleCreationSuccess(res, 'Book created successfully.', Transformer.transformBookData(newBook));
  } catch (error) {
    ResponseHelper.handleError(res, error instanceof Error ? error.message : 'An unknown error occurred.');
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, sortBy = 'title', title } = req.query;

    const books = await bookService.getAllBooks(
      Number(page),          
      Number(limit),         
      sortBy as string,      
      { title: title as string } 
    );

    ResponseHelper.handleSuccess(res, 'Books retrieved successfully.', books);
  } catch (error) {
    ResponseHelper.handleError(res, 'An error occurred while retrieving books.');
  }
};



// Get book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(id);
    ResponseHelper.handleSuccess(res, 'Book retrieved successfully.', Transformer.transformBookData(book));
  } catch (error) {
    ResponseHelper.handleError(res, 'An error occurred while retrieving book.');
  }
};

// Update book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, authorId, categoryId, publicationYear, ISBN } = req.body;
    if (!ValidationHelper.checkRequiredFields(req.body, ['title', 'authorId', 'categoryId','publicationYear', 'ISBN' ], res)) return;
    const updatedBook = await bookService.updateBook(id, { title, authorId, categoryId, publicationYear, ISBN });
    ResponseHelper.handleSuccess(res, 'Book updated successfully.', Transformer.transformBookData(updatedBook));
  } catch (error) {
    ResponseHelper.handleError(res, 'An error occurred while updating book.');
  }
};

// Delete book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id);
    ResponseHelper.handleSuccess(res, 'Book deleted successfully.');
  } catch (error) {
    ResponseHelper.handleError(res, 'An error occurred while deleting book.');
  }
};
