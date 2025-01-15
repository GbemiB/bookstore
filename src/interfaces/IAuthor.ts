export interface IAuthor extends Document {
    firstName: string;
    lastName: string;
    title: string;
    bio?: string;
}