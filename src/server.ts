import express from 'express';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import colors, { bgGreen } from 'colors';
import db from './config/db';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.blue('Conexión exitosa'));
    } catch (error) {
        console.log(error);
        console.log(colors.bgRed.white('Error al conectar con la base de datos'));
    }
}

connectDB();

// Instancia de Express
const server = express();

// Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export default server;