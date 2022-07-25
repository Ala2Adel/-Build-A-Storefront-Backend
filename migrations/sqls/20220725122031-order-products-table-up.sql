CREATE TABLE IF NOT EXISTS order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (order_id),
  product_id INTEGER NOT NULL REFERENCES products (prod_id),
  quantity   INTEGER NOT NULL
);