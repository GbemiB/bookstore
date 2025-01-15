import Author from '../models/author.model';
import Book from '../models/book.model';
import Transformer from '../utils/transformer';


export class AuthorService {
    // Create author logic
    async createAuthor(data: { firstName: string; lastName: string; title: string; bio?: string }) {
        const existingAuthor = await Author.findOne({ firstName: data.firstName, lastName: data.lastName });
        if (existingAuthor) {
            throw new Error('An author with this name already exists.');
        }
        const newAuthor = new Author(data);
        return newAuthor.save();
    }

   // Get all authors with filtering, sorting, and pagination
   async getAllAuthors(
    page = 1,
    limit = 10,
    sortBy = 'lastName',
    filter?: { lastName?: string }
) {
    const query = filter?.lastName ? { name: { $regex: filter.lastName, $options: 'i' } } : {};
    const authors = await Author.find(query)
        .sort(sortBy)
        .skip((page - 1) * limit)
        .limit(limit);
    const totalAuthors = await Author.countDocuments(query);
    const transformedAuthors = authors.map(author => Transformer.transformAuthorData(author));
    return {
        books: transformedAuthors,
        totalAuthors,
        totalPages: Math.ceil(totalAuthors / limit),
        currentPage: page,
    };
}

    // Get a specific author 
    async getAuthorById(id: string) {
        const author = await Author.findById(id);
        if (!author) {
            throw new Error('Author does not exist.');
        }
        return author;
    }

    // Update an exiting author
    async updateAuthor(
        id: string,
        data: { firstName?: string; lastName?: string; title?: string; bio?: string }
    ) {
        const author = await Author.findById(id);
        if (!author) {
            throw new Error('Author does not exist.');
        }

        const updatedData = {
            ...author.toObject(),
            ...data,
        };

        return Author.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    }

    // Delete an author
    async deleteAuthor(id: string) {
        const author = await Author.findById(id);
        if (!author) {
            throw new Error('Author does not exist.');
        }

        const hasBooks = await Book.exists({ author: id });
        if (hasBooks) {
            throw new Error('Cannot delete author with associated books.');
        }

        return Author.findByIdAndDelete(id);
    }

    
}
