import client from "../database";
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS as string;;

// defined fields in db
export type User = {
    user_id?: number;
    first_name: string,
    last_name: string,
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
            const sqlQuery = `INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *`;

            const hashPassCode = bcrypt.hashSync(
                user.password + pepper,
                parseInt(saltRounds)
            )

            const result = await conn
                .query(sqlQuery, [user.first_name, user.last_name, hashPassCode])
            conn.release();
            return result.rows[0];

        } catch (err) {
            throw new Error(`Could not create new user & error = ${err}`)
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


    async authenticate(userName: string, password: string): Promise<User | null> {
        try {
            const connection = await client.connect();
            const sqlQuery = 'SELECT * FROM users WHERE first_name=($1)';
            const result = await connection.query(sqlQuery, [userName]);
            connection.release();
            const authUser = result.rows[0];
            if (authUser) {
                if (bcrypt.compareSync(password + pepper, authUser.password)) {
                    return authUser;
                }
            }
            return null;

        } catch (error) {
            throw new Error(
                `Failed to login in as ${userName}  & error: ${error}`
            );
        }
    }


}