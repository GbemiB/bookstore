import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import ResponseHelper from '../utils/response';
import ValidationHelper from '../utils/validation';
import Transformer from '../utils/transformer';

const categoryService = new CategoryService();

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!ValidationHelper.checkRequiredFields(req.body, ['name'], res)) return;
        const newCategory = await categoryService.createCategory({ name });
        ResponseHelper.handleCreationSuccess(res, 'Category created successfully.', Transformer.transformCategoryData(newCategory));
    } catch (error) {
        ResponseHelper.handleError(res, error instanceof Error ? error.message : 'An error occurred while creating category.');
    }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, sortBy = 'name', name } = req.query;

    const categories = await categoryService.getAllCategories(
      Number(page),         
      Number(limit),          
      sortBy as string,       
      { name: name as string } 
    );


    ResponseHelper.handleSuccess(res, 'Categories retrieved successfully.', categories);
  } catch (error) {
    ResponseHelper.handleError(res, 'An error occurred while retrieving categories.');
  }
}

// Get category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        ResponseHelper.handleSuccess(res, 'Category retrieved successfully.', Transformer.transformCategoryData(category));
    } catch (error) {
        ResponseHelper.handleError(res, 'An error occurred while retrieving category.');
    }
};

// Update category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!ValidationHelper.checkRequiredFields(req.body, ['name'], res)) return;
        const updatedCategory = await categoryService.updateCategory(id, { name });
        ResponseHelper.handleSuccess(res, 'Category updated successfully.', Transformer.transformCategoryData(updatedCategory));
    } catch (error) {
        ResponseHelper.handleError(res, 'An error occurred while updating category.');
    }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        ResponseHelper.handleSuccess(res, 'Category deleted successfully.');
    } catch (error) {
        ResponseHelper.handleError(res, 'An error occurred while deleting category.');
    }
};
