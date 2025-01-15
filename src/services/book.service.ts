import Book from '../models/book.model';
import Category from '../models/category.model';
import Author from '../models/author.model';
import Transformer from '../utils/transformer';

export class BookService {
    // Create a new book
    async createBook(data: { title: string; authorId: string; categoryId: string; publicationYear: number; ISBN: string }) {
        const authorExists = await Author.findById(data.authorId);
        if (!authorExists) {
            throw new Error('Author does not exist.');
        }

        const categoryExists = await Category.findById(data.categoryId);
        if (!categoryExists) {
            throw new Error('Category does not exist.');
        }

        const newBook = new Book(data);
        return await newBook.save();
    }


    // Get all books with filtering, sorting, and pagination
    async getAllBooks(
        page = 1,
        limit = 10,
        sortBy = 'title',
        filter?: { title?: string }
    ) {
        const query = filter?.title ? { title: { $regex: filter.title, $options: 'i' } } : {};
        const books = await Book.find(query)
            .sort(sortBy)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalBooks = await Book.countDocuments(query);
        const transformedBooks = books.map(book => Transformer.transformBookData(book));
        return {
            books: transformedBooks,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
        };
    }

    // Get a book by ID
    async getBookById(id: string) {
        const book = await Book.findById(id);
        if (!book) {
            throw new Error('Book not found.');
        }
        return book;
    }

    // Update book
    async updateBook(id: string, data: { title: string; authorId: string; categoryId: string; publicationYear: number; ISBN: string }) {

        const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!updatedBook) {
            throw new Error('Book not found.');
        }
        return updatedBook;
    }

    // Delete book
    async deleteBook(id: string) {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new Error('Book not found.');
        }
    }
}
