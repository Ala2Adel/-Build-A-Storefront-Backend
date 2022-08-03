import express, { Request, Response } from 'express';
import { Order, OrdersModel } from '../models/order';
import { VerifyUser } from '../middleware/jwtAuth';

const orderModel = new OrdersModel();

const index = async (_req: Request, res: Response) => {
    try {
        VerifyUser(_req);
        const orders = await orderModel.index();
        res.status(200).json({
            status: 'success',
            data: orders,
            message: 'orders list fetched successfully',
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
        const orderId: number = parseInt(_req.params.order_id);
        if (orderId === null || orderId < 0) {
            return res
                .status(400)
                .send('check parameters. order id is required');
        }

        const Authorized = VerifyUser(_req, orderId);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User cannot be authorized',
            })
        }

        const currentOrder = await orderModel.show(orderId);
        res.status(200).json({
            status: 'success',
            data: currentOrder,
            message: 'order fetched successfully',
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
    const test_create: Order = {
        order_status: 'active',
        user_id: 1
    };
    try {
        const { order_status, user_id } = _req.body;
        if (order_status || user_id === null) {
            return res
                .status(400)
                .send('check parameters. Order status and user_id are required');
        }
        const Authorized = VerifyUser(_req, user_id);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User cannot be authorized',
            })
        }
        const newOrder = await orderModel.create(test_create);
        res.send(newOrder).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}

const update = async (_req: Request, res: Response) => {
    const test_update: Order = {
        order_id: 1,
        order_status: 'completed',
        user_id: 1
    };
    try {
        const { order_status, user_id } = _req.body;
        if (order_status || user_id === null) {
            return res
                .status(400)
                .send('check parameters. Order status and user_id are required');
        }

        const Authorized = VerifyUser(_req, user_id);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User cannot be verified',
            })
        }
        const updatedOrder = await orderModel.update(test_update);
        res.send(updatedOrder).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}

const deleteOrder = async (_req: Request, res: Response) => {
    const orderId: number = parseInt(_req.params.order_id);
    try {
        const { order_id } = _req.body;
        if (order_id === null) {
            return res
                .status(400)
                .send('check parameters. Order status and user_id are required');
        }

        const Authorized = VerifyUser(_req, orderId);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User cannot be authorized',
            })
        }

        const delOrder = await orderModel.delete(orderId);
        res.send(delOrder).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}


const order_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/order/:id', show);
    app.post('/order/new', create);
    app.put('/order/:id', update);
    app.delete('/order/:id', deleteOrder);
}

export default order_routes;