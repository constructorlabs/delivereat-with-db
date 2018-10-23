CREATE DATABASE delivereat_db;

CREATE TABLE menu (
  id serial PRIMARY KEY,
  name varchar (100) NOT NULL,
  price NUMERIC(5,2) NOT NULL,
  description varchar (500) NOT NULL,
  vegan BOOLEAN NOT NULL
)

INSERT INTO menu VALUES (1, 'Rainbow Cake', 4.99, 'Great for a party', FALSE);
INSERT INTO menu VALUES (2, 'New York Cheesecake', 3.99, 'Classic', FALSE);
INSERT INTO menu VALUES (3, 'Strawberry Cheesecake', 3.99, 'Classic with rich strawberry', FALSE);
INSERT INTO menu VALUES (4, 'Sticky Toffee Pudding', 5.99, 'Sweet and rich and served warm', FALSE);
INSERT INTO menu VALUES (5, 'Red Velvet', 4.50, 'Posher version of sponge', FALSE);
INSERT INTO menu VALUES (6, 'Victoria Sponge', 4.99, 'British Classic with cream and jam', FALSE);
INSERT INTO menu VALUES (7, 'Apple Pie', 4.00, 'American classic', FALSE);
INSERT INTO menu VALUES (8, 'Chocolate Tort', 5.00, 'Ultra rich for chocolate enthusiasts', FALSE);
INSERT INTO menu VALUES (9, 'Battenberg', 3.50, 'Great for kids', FALSE);
INSERT INTO menu VALUES (10, 'Lemon Cake', 3.25, 'Sweet and tart and indulgent', FALSE);
ALTER SEQUENCE menu_id_seq RESTART WITH 11 INCREMENT BY 1

CREATE TABLE order (
  id serial PRIMARY KEY,
  name varchar (100) NOT NULL,
  address varchar (500) NOT NULL,
  telephone varchar (15) NOT NULL
)

CREATE TABLE order_content (
  id serial PRIMARY KEY,
  quantity INT NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menu (id),
  FOREIGN KEY (order_id) REFERENCES order (id)
)


UPDATE menu SET photoUrl='rainbow.jpeg' WHERE id=1;
UPDATE menu SET photoUrl='blueberry.jpeg' WHERE id=2;
UPDATE menu SET photoUrl='strawberry.jpeg' WHERE id=3;
UPDATE menu SET photoUrl='toffee.jpeg' WHERE id=4;
UPDATE menu SET photoUrl='redvelvet.jpeg' WHERE id=5;
UPDATE menu SET photoUrl='banana.jpeg' WHERE id=6;
UPDATE menu SET photoUrl='apple.jpeg' WHERE id=7;
UPDATE menu SET photoUrl='tart.jpeg' WHERE id=8;
UPDATE menu SET photoUrl='battenberg.jpeg' WHERE id=9;
UPDATE menu SET photoUrl='fudge.jpeg' WHERE id=10;


ALTER TABLE menu
ADD photoUrl varchar(200);

-- CREATE TABLE delivery (
--   id serial PRIMARY KEY,
--   price_range
--   delivery_charge
--   FOREIGN KEY (menu_id) REFERENCES menu (id),
--   FOREIGN KEY (order_id) REFERENCES order (id),
-- )
