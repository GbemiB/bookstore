import Category from '../models/category.model';
import Transformer from '../utils/transformer';

export class CategoryService {
    // Create a new category
    async createCategory(data: { name: string }) {
        const newCategory = new Category(data);
        return await newCategory.save();
    }


    // Get all categories with filtering, sorting, and pagination
    async getAllCategories(
        page = 1,
        limit = 10,
        sortBy = 'name',
        filter?: { name?: string }
    ) {
        const query = filter?.name ? { name: { $regex: filter.name, $options: 'i' } } : {};
        const categories = await Category.find(query)
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalCategories = await Category.countDocuments(query);
        const transformedBooks = categories.map(category => Transformer.transformBookData(category));
        return {
            books: transformedBooks,
            totalCategories,
            totalPages: Math.ceil(totalCategories / limit),
            currentPage: page,
        };
    }


    // Get a category by ID
    async getCategoryById(id: string) {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Category not found.');
        }
        return category;
    }

    // Update category
    async updateCategory(id: string, data: { name: string }) {
        const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedCategory) {
            throw new Error('Category not found.');
        }
        return updatedCategory;
    }

    // Delete category
    async deleteCategory(id: string) {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error('Category not found.');
        }
    }
}
