import mongoose, { Schema, Document } from 'mongoose';
import { IBook } from '../interfaces/IBook';

const bookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    publicationYear: { 
      type: Number, 
      min: 1500, 
      max: new Date().getFullYear(), 
    },
    ISBN: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^(97(8|9))?\d{9}(\d|X)$/, 'Please enter a valid ISBN number'], 
    },
  },
  { timestamps: true }
);


bookSchema.index({ authorId: 1 });
bookSchema.index({ categoryId: 1 });

const Book = mongoose.model<IBook & Document>('Book', bookSchema);

export default Book;
