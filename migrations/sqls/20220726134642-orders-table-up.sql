CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_status VARCHAR(50),
    user_id INTEGER NOT NULL REFERENCES users (user_id)
);