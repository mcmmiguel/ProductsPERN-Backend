import { Request, Response } from 'express'
import Product from '../models/Product.model';


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body); //Create crea la instancia y lo almacena en la BD en un solo paso
        res.json({ data: product });
    } catch (error) {
        console.log(error);
    }
}