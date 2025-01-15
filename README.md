#Bookstore API
Overview
The Bookstore API is a RESTful API developed with Node.js, Express, and TypeScript. It enable users to manage books, authors, and categories 

Technology
Node.js
npm 
Express
TypeScript
MongoDB
Jest

SETUP
1. Clone the Repository
git clone https://github.com/yourusername/bookstore-api.git // update
cd bookstore


2. Install Dependencies
npm install

3. Environment Variables
PORT=3000
DB_URL=mongodb://localhost:27017/bookstore


4. Compile TypeScript
npm run build

5. Run the Application
You can run locally or using docker 

Locally 
npm run start

Docker
docker build -t bookstore .
docker run -p 5001:5001 bookstore

6. Run Tests
npm run test

```json
API Routes
Books
Create a new book: POST /api/v1/book
Request body:
{
    "title": "Love Birds",
    "authorId": "67875d4f326fa821ad97f476",
    "categoryId": "6787afd36965c1f83077de78",
    "publicationYear": 2024,
    "ISBN": "9783161484101"
}


Response:

{
    "message": "Book created successfully.",
    "data": {
        "identifier": "6787b0a27bfe871315416fcb",
        "title": "Love Birds",
        "publicationYear": 2024,
        "ISBN": "9783161484101",
        "createdAt": "2025-01-15T12:57:06.769Z",
        "updatedAt": "2025-01-15T12:57:06.769Z"
    }
}


Get all books: GET /api/v1/book
Response:
{
  "data": [
    {
       "identifier": "6787b0a27bfe871315416fcb",
        "title": "Love Birds",
        "publicationYear": 2024,
        "ISBN": "9783161484101",
        "createdAt": "2025-01-15T12:57:06.769Z",
        "updatedAt": "2025-01-15T12:57:06.769Z"
    }
  ]
}


Get a specific book: GET /api/v1/book/:id
Response:
{
  "data": {
       "identifier": "6787b0a27bfe871315416fcb",
        "title": "Love Birds",
        "publicationYear": 2024,
        "ISBN": "9783161484101",
        "createdAt": "2025-01-15T12:57:06.769Z",
        "updatedAt": "2025-01-15T12:57:06.769Z"
  }
}


Update a book: PUT /api/v1/book/:id
Request body:
{
    "title": "Love Birds New",
    "authorId": "67875d4f326fa821ad97f476",
    "categoryId": "6787afd36965c1f83077de78",
    "publicationYear": 2024,
    "ISBN": "9783161484101"
}

Response:
{
  "message": "Book updated successfully.",
  "data": {
    "title": "Love Birds New",
    "authorId": "67875d4f326fa821ad97f476",
    "categoryId": "6787afd36965c1f83077de78",
    "publicationYear": 2024,
    "ISBN": "9783161484101"
  }
}


Delete a book: DELETE /api/v1/book/:id
Response:
{
  "message": "Book deleted successfully."
}


Authors
Create a new author: POST /api/v1/author

Request body:
{
    "firstName": "“Jessica",
    "lastName": "Andrews",
    "title": "Prof",
    "bio": "Jessica is a writer"
}

Response:
{
  "message": "Author created successfully.",
  "data": {
    "firstName": "“Jessica",
    "lastName": "Andrews",
    "title": "Prof",
    "bio": "Jessica is a writer"
  }
}


Get all authors: GET /api/v1/author
Response:
{
  "data": [
    {
    "firstName": "“Jessica",
    "lastName": "Andrews",
    "title": "Prof",
    "bio": "Jessica is a writer"
    }
  ]
}


Get a specific author: GET /api/v1/author/:id
Response:
{
  "data": {
    "firstName": "“Jessica",
    "lastName": "Andrews",
    "title": "Prof",
    "bio": "Jessica is a writer"
  }
}


Update an author: PUT /api/v1/author/:id
Request body:
{
   "firstName": "“Jessica",
    "lastName": "Andrews",
    "title": "Ms",
    "bio": "Jessica is a writer"
}
Response:
{
  "message": "Author updated successfully.",
  "data": {
  "firstName": "“Jessica",
    "lastName": "Andrews",
    "title": "Ms",
    "bio": "Jessica is a writer"
  }
}


Delete an author: DELETE /api/v1/author/:id
Response:
{
  "message": "Author deleted successfully."
}


Categories
Create a new category: POST /api/v1/category

Request body:
{
  "name": "friction"
}

Response:
{
  "message": "Category created successfully.",
  "data": {
    "name": "friction"
  }
}


Get all categories: GET /api/v1/category
Response:
{
  "data": [
    {
    "name": "friction"
    }
  ]
}


Get a specific category: GET /api/v1/category/:id
Response:
{
  "data": {
    "name": "friction"
  }
}


Update a category: PUT /api/v1/category/:id
Request body:
{
    "name": "Advanced friction"
}

Response:
{
  "message": "Category updated successfully.",
  "data": {
     "name": "Advanced friction"
  }
}


Delete a category: DELETE /api/v1/category/:id
Response:
{
  "message": "Category deleted successfully."
}
```