import request from 'supertest';
import app from '../index'; 
import { CategoryService } from '../services/category.service';


jest.mock('../services/category.service');  

describe('Category Controller', () => {
  let categoryServiceMock: jest.Mocked<CategoryService>;

  beforeEach(() => {
    categoryServiceMock = new CategoryService() as jest.Mocked<CategoryService>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('should create a new category', async () => {
    const mockCategory: any = { _id: '1', name: 'Romance' };  
    
    categoryServiceMock.createCategory.mockResolvedValue(mockCategory);
  
    const response = await request(app)
      .post('/api/v1/category')
      .send({ name: 'Romance' });
  
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Category created successfully.');
    expect(response.body.data.name).toBe('Romance');
    expect(response.body.data._id).toBe('1'); 
  });
  
  it('should delete a category', async () => {
    categoryServiceMock.deleteCategory.mockResolvedValue(undefined); 
  
    const response = await request(app)
      .delete('/api/v1/category/1');  
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Category deleted successfully.');
  });
  

});
