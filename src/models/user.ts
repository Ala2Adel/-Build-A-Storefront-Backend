import client from "../database";

// defined fields in db
export type User = {
    user_id?: number;
    firstName: string,
    lastName: string,
    password: string
};

export class UsersModel {
    async index(): Promise<User[]> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM users';
            const result = await connection.query(sqlQuery);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Cannot get users & error = ${error}`
            );
        }
    }

    async show(user_id: number): Promise<User> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM users WHERE user_id=($1)';
            const result = await connection.query(sqlQuery, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Cannot get user of id ${user_id} & error = ${error}`
            );
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sqlQuery = `INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`

            const result = await conn
                .query(sqlQuery, [user.firstName, user.lastName, user.password])
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not create new user & error= ${err}`)
        }
    }
    // update through changing the password

    async update(user_id: number, password: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sqlQuery = `UPDATE users SET password=($1) WHERE user_id=($2) RETURNING *`
            const result = await conn.query(sqlQuery, [password, user_id])
            conn.release()
            return result.rows[0]

        } catch (err) {
            throw new Error(`Could not update user status & ${err}`)
        }
    }

    async delete(user_id: number): Promise<User> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'DELETE FROM users WHERE user_id=($1) RETURNING *';
            const result = await connection.query(sqlQuery, [user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Failed to delete user of id ${user_id}  & error: ${error}`
            );
        }
    }


}