import express from 'express';
import router from './router';
import colors, { bgGreen } from 'colors'
import db from './config/db';

// Conectar a base de datos
async function connectDB() {
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

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' });
})

export default server;