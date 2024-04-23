import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Test",
            price: 300,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');

    });
});