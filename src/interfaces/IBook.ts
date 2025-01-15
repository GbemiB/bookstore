
export interface IBook extends Document {
    title: string;
    authorId: string;
    categoryId: string;
    publicationYear: number;
    ISBN: string;
  }