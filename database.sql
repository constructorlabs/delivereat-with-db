-- ORIGIN TABLE (to amend use drop as below)

CREATE DATABASE lemonycafe_db

--DROP table menu;
--DROP table order;
--DROP table menu-order;

-- IMMUTABLE BASE TABLE FOR MENU ITEMS (ONE-)
CREATE TABLE menu (
id serial,
name TEXT NOT NULL UNIQUE,
price INT NOT NULL,
PRIMARY KEY (id)
);

-- DYNAMIC TABLE FOR ORDER ITEMS (MANY-)
CREATE TABLE "order" (
id serial,
ordertime TIMESTAMP,
PRIMARY KEY (id)
);

-- DYNAMIC MAPPING TABLE FOR ORDER-MENU ITEMS (MANY-)
CREATE TABLE menu_order (
id serial,
order_id INT,
menu_id INT,
quantity INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (order_id) REFERENCES "order" (id),
FOREIGN KEY (menu_id) REFERENCES menu (id)
);

INSERT INTO menu VALUES (1, 'Cappuccino', 2.5);
INSERT INTO menu VALUES (2, 'Latte', 2.5);
INSERT INTO menu VALUES (3, 'Flat White', 2.3);
INSERT INTO menu VALUES (4, 'Cortado', 2);
INSERT INTO menu VALUES (5, 'Macchiato', 1.8);
INSERT INTO menu VALUES (6, 'Tiffin', 1.8);
INSERT INTO menu VALUES (7, 'Rocky Road', 1.8);
INSERT INTO menu VALUES (8, 'Scone', 1.5);
INSERT INTO menu VALUES (9, 'Apple cake', 2.5);
INSERT INTO menu VALUES (10, 'Breakfast wrap', 5);
INSERT INTO menu VALUES (11, 'Eggs on toast', 3.5);
INSERT INTO menu VALUES (12, 'Pancake stack', 4.5);
INSERT INTO menu VALUES (13, 'Sausage sammidge', 3.5);
INSERT INTO menu VALUES (14, 'Porridge', 2.5);
ALTER SEQUENCE menu_id_seq RESTART WITH 15 INCREMENT BY 1;

