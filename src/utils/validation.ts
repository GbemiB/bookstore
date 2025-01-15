import Category from '../models/category.model';
import Author from '../models/author.model';
import { Response } from 'express';

class ValidationHelper {
  static async validateCategoryId(categoryId: string, res: Response): Promise<boolean> {
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      res.status(404).json({ message: 'Category does not exist.' });
      return false;
    }
    return true;
  }

  static async validateAuthorId(authorId: string, res: Response): Promise<boolean> {
    const authorExists = await Author.findById(authorId);
    if (!authorExists) {
      res.status(404).json({ message: 'Author does not exist.' });
      return false;
    }
    return true;
  }

  static checkRequiredFields(fields: { [key: string]: any }, requiredFields: string[], res: Response): boolean {
    for (let field of requiredFields) {
      if (!fields[field]) {
        res.status(400).json({ message: `${field} is mandatory.` });
        return false;
      }
    }
    return true;
  }
}

export default ValidationHelper;
