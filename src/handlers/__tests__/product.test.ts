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

describe('GET /api/products/id', () => {
    test('should return  a 404 response for a non-existent product', async () => {
        const productID = 2000;
        const response = await request(server).get(`/api/products/${productID}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    });

    test('should check a valid ID in the url', async () => {
        const response = await request(server).get('/api/products/not-valid-url');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('ID no válido');
    });

    test('GET a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});

describe('PUT /api/products/id', () => {
    test('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('should validate that the price is grater than 0', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Xbox One Series X',
            price: -10,
            availability: true,
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
});

describe('PATCH /api/products/id', () => {
    test('should should return a 404 response for non existant product', async () => {
        const productID = 2000;

        const response = await request(server).patch(`/api/products/${productID}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });
});

describe('DELETE /api/products/id', () => {
    test('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('ID no válido');
    });

    test('should return a 404 response for a non-existent product', async () => {
        const productID = 2000;
        const response = await request(server).delete(`/api/products/${productID}`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.status).not.toBe(200);
    });

    test('should delete a product', async () => {
        const response = await request(server).delete(`/api/products/1`);

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Producto eliminado');

        expect(response.status).not.toBe(404);
    })
});