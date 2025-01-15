import mongoose, { Schema, Document } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

categorySchema.index({ name: 1 }); 

const Category = mongoose.model<ICategory & Document>('Category', categorySchema);

export default Category;
