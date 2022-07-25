import client from "../database";

export type Order = {
    order_id?: number;
    order_status: string,
    user_id: number;
};

export class OrdersModel {
    async index(): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM orders';
            const result = await connection.query(sqlQuery);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Cannot get orders & error = ${error}`
            );
        }
    }

    async show(order_id: number): Promise<Order[]> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM orders WHERE order_id=($1)';
            const result = await connection.query(sqlQuery, [order_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Cannot get order of id ${order_id} & error = ${error}`
            );
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const { order_status, user_id } = order;
            const sqlQuery = `INSERT INTO orders (order_status, user_id) VALUES($1, $2) RETURNING *`;
            const result = await conn.query(sqlQuery, [order_status, user_id])
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not create new order & error= ${err}`)
        }
    }

    async update(order: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sqlQuery = `UPDATE orders SET order_status=($1), user_id=($2) WHERE order_id=($3) RETURNING *`
            const result = await conn.query(sqlQuery, [order.order_status, order.user_id, order.order_id])
            conn.release()
            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not update order status & ${err}`)
        }
    }

    async delete(order_id: number): Promise<Order> {
        try {
            const connection = await client.connect();
            const sqlQuery = `DELETE FROM orders WHERE order_id=($1) RETURNING *`;
            const result = await connection.query(sqlQuery, [order_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to delete order of id ${order_id}  & error: ${error}`
            );
        }
    }


}