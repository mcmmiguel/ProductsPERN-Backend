import { connectDB } from '../server';
import db from '../config/db';

jest.mock('../config/db');

describe('connectDB', () => {
    test('should handle db connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Error al conectar con la base de datos'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error al conectar con la base de datos'));
    });
});