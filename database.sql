CREATE DATABASE delivereat;
CREATE TABLE menu (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description VARCHAR(140) NOT NULL,
  price NUMERIC(4,2) NOT NULL
);

INSERT INTO menu (id, name, description, price) VALUES
  (1, 'Espresso', 'Single shot, 30ml', 2),
  (2, 'Ristretto', 'Concentrated espresso, 22ml', 2),
  (3, 'Macchiato', '60ml espresso + a dab of milk foam', 2.2),
  (4, 'Americano', '60ml espresso + 90ml hot water', 2.3),
  (5, 'Cortado', '60ml espresso + 30ml milk foam', 2.4),
  (6, 'Cappuccino', '60ml espresso + 60ml steamed milk + 60ml milk foam', 2.5),
  (7, 'Flat White', '60ml espresso + 120ml steamed milk', 2.5),
  (8, 'Latte', '60ml espresso + 180ml steamed milk + 2ml milk foam', 2.5),
  (9, 'Mocha',  '60ml espresso + 60ml chocolate + 30ml steamed milk', 2.9);
ALTER SEQUENCE menu_id_seq RESTART WITH 10 INCREMENT BY 1;

CREATE TABLE "order" (
  id SERIAL PRIMARY KEY,
  status VARCHAR(30) NOT NULL,
  time VARCHAR(30) NOT NULL
);

CREATE TABLE menu_order (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  menu_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES "order"(id),
  FOREIGN KEY (menu_id) REFERENCES menu(id)
);