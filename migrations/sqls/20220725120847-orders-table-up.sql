CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE,
    order_status VARCHAR(50),
    order_quantity INTEGER
);