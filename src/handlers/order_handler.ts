import express, { Request, Response } from 'express';
import { Order, OrdersModel } from '../models/order';

const orderModel = new OrdersModel();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await orderModel.index();
        res.send(orders).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(400).json({
            status: 'error',
            message: e.message,
        })

    }
}

const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    // app.get('/orders/:id', show);
    // app.post('/orders', create);
    // app.put('/orders', update);
    // app.delete('/orders', destroy);
    // app.post('/leads/login', authenticate);

}

export default order_routes;