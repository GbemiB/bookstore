class Transformer {
    static transformAuthorData(author: any) {
        return {
            identifier: author._id,
            firstName: author.firstName,
            lastName: author.lastName,
            title: author.title,
            bio: author.bio,
            createdAt: author.createdAt,
            updatedAt: author.updatedAt,
        };
    }

    static transformCategoryData(category: any) {
        return {
            identifier: category._id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }

    static transformBookData(book: any) {
        return {
            identifier: book._id,
            title: book.title,
            author: book.author,
            category: book.category,
            publicationYear: book.publicationYear,
            ISBN: book.ISBN,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        };
    }
   
}

export default Transformer;
