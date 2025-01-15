import mongoose, { Schema, Document } from 'mongoose';
import { IAuthor } from '../interfaces/IAuthor';

const authorSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    bio: { type: String, trim: true }, 
  },
  { timestamps: true }
);

authorSchema.index({ lastName: 1, firstName: 1 }); 

const Author = mongoose.model<IAuthor & Document>('Author', authorSchema);

export default Author;
