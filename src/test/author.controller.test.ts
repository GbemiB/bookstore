import request from 'supertest';
import app from '../index';
import { AuthorService } from '../services/author.service';


jest.mock('../services/author.service');

describe('Author Controller', () => {
    let authorServiceMock: jest.Mocked<AuthorService>;

    beforeEach(() => {
        authorServiceMock = new AuthorService() as jest.Mocked<AuthorService>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should create a new author', async () => {
        const mockAuthor: any = {
            firstName: "Jessica",
            lastName: "Andrews",
            title: "Prof",
            bio: "Jessica is a writer",
            createdAt: "2025-01-15T07:01:35.729Z",
            updatedAt: "2025-01-15T07:01:35.729Z"
        };

        authorServiceMock.createAuthor.mockResolvedValue(mockAuthor);

        const response = await request(app)
            .post('/api/v1/author')
            .send({
                identifier: "67875d4f326fa821ad97f476",
                firstName: "Jessica",
                lastName: "Andrews",
                title: "Prof",
                bio: "Jessica is a writer",
                createdAt: "2025-01-15T07:01:35.729Z",
                updatedAt: "2025-01-15T07:01:35.729Z"       });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Author created successfully.');
        expect(response.body.data.firstName).toBe('Jessica');
        expect(response.body.data.identifier).toBe('67875d4f326fa821ad97f476');
    });

});
