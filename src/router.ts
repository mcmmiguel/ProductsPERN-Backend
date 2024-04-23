import { Router } from 'express';
import { createProduct } from './handlers/product';
import { body } from 'express-validator';
import { handleInputErrors } from './middleware';

const router = Router();

// Routing
router.get('/', (req, res) => {

    res.json('Desde GET');
});

router.post('/',
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede estar vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede estar vacío')
        .custom(value => value > 0).withMessage('Precio no válido'),
    handleInputErrors, //Middleware
    createProduct //Handler
);

router.put('/', (req, res) => {

    res.json('Desde PUT');
});

router.patch('/', (req, res) => {

    res.json('Desde PATCH');
});

router.delete('/', (req, res) => {

    res.json('Desde DELETE');
});

export default router;