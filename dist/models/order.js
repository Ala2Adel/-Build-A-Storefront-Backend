"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersModel {
    async index() {
        try {
            const connection = await database_1.default.connect();
            const sqlQuery = 'SELECT * FROM orders';
            const result = await connection.query(sqlQuery);
            connection.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Cannot get orders & error = ${error}`);
        }
    }
    async show(order_id) {
        try {
            const connection = await database_1.default.connect();
            const sqlQuery = 'SELECT * FROM orders WHERE order_id=($1)';
            const result = await connection.query(sqlQuery, [order_id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Cannot get order of id ${order_id} & error = ${error}`);
        }
    }
    async create(order) {
        try {
            const sqlQuery = `INSERT INTO orders (order_id, order_date, order_status, order_quantity) VALUES($1, $2, $3, $4) RETURNING *`;
            const { order_id, order_date, order_status, order_quantity } = order;
            const conn = await database_1.default.connect();
            const result = await conn
                .query(sqlQuery, [order_id, order_date, order_status, order_quantity]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not create new order & error= ${err}`);
        }
    }
    async update(order_id, order_status) {
        try {
            const conn = await database_1.default.connect();
            const sqlQuery = `UPDATE orders SET ostatus=($1) WHERE order_id=($2) RETURNING order_status`;
            const result = await conn.query(sqlQuery, [order_status, order_id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not update order status & ${err}`);
        }
    }
    async delete(order_id) {
        try {
            const connection = await database_1.default.connect();
            const sqlQuery = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await connection.query(sqlQuery, [order_id]);
            connection.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Failed to delete order of id ${order_id}  & error: ${error}`);
        }
    }
}
exports.OrdersModel = OrdersModel;
