import { Request, Response } from 'express';
import { AuthorService } from '../services/author.service';
import ResponseHelper from '../utils/response';
import Transformer from '../utils/transformer';
import ValidationHelper from '../utils/validation';

const authorService = new AuthorService();

// Create a new author
export const createAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, title, bio } = req.body;
        if (!ValidationHelper.checkRequiredFields(req.body, ['firstName', 'lastName', 'title'], res)) return;
        const newAuthor = await authorService.createAuthor({ firstName, lastName, title, bio });
        ResponseHelper.handleCreationSuccess(res, 'Author created successfully', Transformer.transformAuthorData(newAuthor));
    } catch (error) {
        ResponseHelper.handleError(res, error instanceof Error ? error.message : 'An error occurred while creating author.');
    }
};

// Get all authors
export const getAllAuthors = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, sortBy = 'lastName', lastName } = req.query;
        const authors = await authorService.getAllAuthors(
            Number(page),         
            Number(limit),       
            sortBy as string,      
            { lastName: lastName as string } 
        );
        ResponseHelper.handleSuccess(res, 'Authors retrieved successfully', authors);
    } catch (error) {
        ResponseHelper.handleError(res, 'An error occurred while retrieving authors.');
    }
};

// Get author by ID
export const getAuthorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const author = await authorService.getAuthorById(id);
        ResponseHelper.handleSuccess(res, 'Author details retrieved successfully', Transformer.transformAuthorData(author));
    } catch (error) {
        ResponseHelper.handleError(res, error instanceof Error ? error.message : 'An error occurred while retrieving author.');
    }
};

// Update author
export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { firstName, lastName, title, bio } = req.body;
        const updatedAuthor = await authorService.updateAuthor(id, { firstName, lastName, title, bio });
        ResponseHelper.handleSuccess(res, 'Author updated successfully', Transformer.transformAuthorData(updatedAuthor));
    } catch (error) {
        ResponseHelper.handleError(res, error instanceof Error ? error.message : 'An error occurred while updating author.');
    }
};

// Delete author
export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await authorService.deleteAuthor(id);
        ResponseHelper.handleSuccess(res, 'Author deleted successfully');
    } catch (error) {
        ResponseHelper.handleError(res, error instanceof Error ? error.message : 'An error occurred while deleting author.');
    }
};
