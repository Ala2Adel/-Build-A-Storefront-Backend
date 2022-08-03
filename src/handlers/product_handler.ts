import express, { Request, Response } from 'express';
import { Product, ProductModel } from '../models/product';
import { VerifyUser } from '../middleware/jwtAuth';

const productModel = new ProductModel();

const index = async (_req: Request, res: Response) => {
    try {
        VerifyUser(_req);
        const products = await productModel.index();
        res.status(200).json({
            status: 'success',
            data: products,
            message: 'products list fetched successfully',
        });
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        })
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const productId: number = parseInt(_req.params.prod_id);
        if (productId === null || productId < 0) {
            return res
                .status(400)
                .send('check parameters. product id is required');
        }
        const Authorized = VerifyUser(_req, productId);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User cannot be authorized',
            })
        }

        const currentProduct = await productModel.show(productId);
        res.status(200).json({
            status: 'success',
            data: currentProduct,
            message: 'product fetched successfully',
        });
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        })

    }
}

const create = async (_req: Request, res: Response) => {
    const test_create: Product = {
        prod_name: "test product",
        prod_price: 125,
        prod_category: "handwash"
    };
    try {
        const { prod_name, prod_price, prod_category } = _req.body;
        if (prod_name || prod_price || prod_category === null) {
            return res
                .status(400)
                .send('Check parameters. product name,price and category are required');
        }
        const Authorized = VerifyUser(_req);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User must be authorized',
            })
        }
        const newProduct = await productModel.create(test_create);
        res.send(newProduct).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}

const update = async (_req: Request, res: Response) => {
    const test_update: Product = {
        prod_id: 1,
        prod_name: "test product",
        prod_price: 125,
        prod_category: "handwash"
    };
    try {
        const { prod_name, prod_price, prod_category } = _req.body;
        if (prod_name || prod_price || prod_category === null) {
            return res
                .status(400)
                .send('Check parameters. product name,price and category are required');
        }

        const Authorized = VerifyUser(_req);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User must be verified',
            })
        }
        const updatedProd = await productModel.update(test_update.prod_id as number, test_update.prod_price);
        res.send(updatedProd).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}

const deleteProduct = async (_req: Request, res: Response) => {
    const prodId: number = parseInt(_req.params.prod_id);
    try {
        const { prod_id } = _req.body;
        if (prod_id === null) {
            return res
                .status(400)
                .send('check parameters. product_id is required');
        }

        const Authorized = VerifyUser(_req);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User must be authorized',
            })
        }

        const delProd = await productModel.delete(prodId);
        res.send(delProd).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}


const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:id', show);
    app.post('/product/new', create);
    app.put('/products', update);
    app.delete('/products', deleteProduct);
}

export default product_routes;