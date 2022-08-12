import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/user';
import { VerifyUser,SignIn } from '../middleware/jwtAuth';

const userModel = new UserModel();

const index = async (_req: Request, res: Response) => {
    try {
        VerifyUser(_req);
        const users = await userModel.index();
        res.status(200).json({
            status: 'success',
            data: users,
            message: 'users list fetched successfully',
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
        const userId: number = parseInt(_req.params.user_id);
        if (userId === null || userId < 0) {
            return res
                .status(400)
                .send('check parameters. user id is required');
        }
        const Authorized = VerifyUser(_req, userId);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User cannot be authorized',
            })
        }

        const currentUser = await userModel.show(userId);
        res.status(200).json({
            status: 'success',
            data: currentUser,
            message: 'user fetched successfully',
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
    const test_create: User = {
        first_name: "Alaa",
        last_name: "Alaraby",
        password: "alaa**1234"
    };
    try {
        const { first_name, last_name, password } = _req.body;
        if (first_name || last_name || password === null) {
            return res
                .status(400)
                .send('Check parameters. Please enter all required fields');
        }
        const Authorized = VerifyUser(_req);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User must be authorized',
            })
        }
        const newUser = await userModel.create(test_create);
        res.send(newUser).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}

const deleteUser = async (_req: Request, res: Response) => {
    const userId: number = parseInt(_req.params.user_id);
    try {
        const { user_id } = _req.body;
        if (user_id === null) {
            return res
                .status(400)
                .send('Check parameters. user_id is required');
        }

        const Authorized = VerifyUser(_req);
        if (!Authorized) {
            res.status(401).json({
                status: 'error',
                message: 'User must be authorized',
            })
        }

        const delUser = await userModel.delete(userId);
        res.send(delUser).status(200);
    } catch (error) {
        const e = error as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}

const authenticate = async (_req: Request, res: Response) => {
    const { user, pass } = _req.body
    if (!user || !pass) {
        return res
            .status(400)
            .send('Check parameters. Please enter a valid user name and password.')
    }
    try {
        const authUser = await userModel.authenticate(user, pass)
        if (authUser === null) {
            res.status(401)
            res.json({
                status: 'Error',
                message: 'Invalid username or password',
            })
        } else {
            const token = SignIn(authUser.user_id as number)
            res.json({
                status: 'Success',
                data: { authUser, token },
                message: `Successfully logged in, Welcome ${user}`,
            })
        }
    } catch (err) {
        const e = err as Error;
        res.status(401).json({
            status: 'failure',
            message: e.message,
        });
    }
}


const user_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/user/:id', show);
    app.post('/user/new', create);
    app.delete('/users', deleteUser);
    app.post('/user/login', authenticate);
}

export default user_routes;