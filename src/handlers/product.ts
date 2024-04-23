import { Request, Response } from 'express'
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            // attributes: {exclude: ['createdAt', 'updatedAt' ]} Para no traer cierta información
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body); //Create crea la instancia y lo almacena en la BD en un solo paso
        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        // Actualizar
        await product.update(req.body); //Update puede actualizar unicamente un campo del objeto, pero lo evitamos en nuestro router con validación
        await product.save();

        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        // Actualizar
        product.availability = !product.dataValues.availability;
        await product.save();

        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}


