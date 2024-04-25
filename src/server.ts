import express from 'express';
import router from './router';
import swaggerUI from 'swagger-ui-express';
import cors, { CorsOptions } from 'cors';
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

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
            console.log('Done');
        } else {
            callback(new Error('Error de CORS'));
        }
    }
}

server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions));

export default server;