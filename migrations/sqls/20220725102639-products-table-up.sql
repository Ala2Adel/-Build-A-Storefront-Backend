CREATE TABLE IF NOT EXISTS products(
    prod_id SERIAL PRIMARY KEY,
    prod_name VARCHAR(255) NOT NULL,
    prod_price NUMERIC NOT NULL,
    prod_category VARCHAR(50)
);