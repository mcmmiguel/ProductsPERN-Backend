import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
    try {
        await db.sync({ force: true });
        console.log('Datos eliminados correctamente');
        exit() // si es cero es que terminó correctamente. es lo mismo que no pasarle nada
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if (process.argv[2] === '--clear') {
    clearDB();
}