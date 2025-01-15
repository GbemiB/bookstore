import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import connectDB from './configs/database.config';
import authorRoutes from './routes/author.routes';
import categoryRoutes from './routes/category.routes';
import bookRoutes from './routes/book.routes';
import { loggerMiddleware } from './middleware/logger.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

connectDB();

app.use('/api/v1', authorRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;

