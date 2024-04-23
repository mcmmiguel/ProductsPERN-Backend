import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import Product from '../models/Product.model';


export const createProduct = async (req: Request, res: Response) => {

    // Validación
    await check('name')
        .notEmpty().withMessage('El nombre del producto no puede estar vacío')
        .run(req);
    await check('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del producto no puede estar vacío')
        .custom(value => value > 0).withMessage('Precio no válido')
        .run(req);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.create(req.body); //Create crea la instancia y lo almacena en la BD en un solo paso
    res.json({ data: product });
}