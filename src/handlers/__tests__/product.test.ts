import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(2);

    });

    test('should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Testing',
            price: 0,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(2);

    });

    test('should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Testing',
            price: 'Hola',
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(201);
        expect(response.body.errors).not.toHaveLength(4);

    });

    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Test",
            price: 300,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');

    });
});

describe('GET /api/products', () => {
    test('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products');
        expect(response.status).not.toBe(404);
    });

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');

        expect(response.body).not.toHaveProperty('errors');
    });
});