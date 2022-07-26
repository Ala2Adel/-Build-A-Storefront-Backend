import client from "../database";

// defined fields in db
export type Product = {
    prod_id?: number;
    prod_name: string,
    prod_price: number,
    prod_category: string
};

export class ProductModel {
    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM products';
            const result = await connection.query(sqlQuery);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Cannot get products & error = ${error}`
            );
        }
    }

    async show(prod_id: number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM products WHERE prod_id=($1)';
            const result = await connection.query(sqlQuery, [prod_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Cannot get product of id ${prod_id} & error = ${error}`
            );
        }
    }

    async create(prod: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const { prod_name, prod_price, prod_category } = prod;
            const sqlQuery = `INSERT INTO products (prod_name, prod_price, prod_category) VALUES($1, $2, $3) RETURNING *`

            const result = await conn
                .query(sqlQuery, [prod_name, prod_price, prod_category]);
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not create new product & error= ${err}`)
        }
    }
    // update product price

    async update(id: number, price: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sqlQuery = `UPDATE products SET prod_price=($1) WHERE prod_id=($2) RETURNING *`
            const result = await conn.query(sqlQuery, [price, id])
            conn.release()
            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not update product status & ${err}`)
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'DELETE FROM products WHERE prod_id=($1) RETURNING *';
            const result = await connection.query(sqlQuery, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to delete product of id ${id}  & error: ${error}`
            );
        }
    }


}