CREATE DATABASE delivereat;

CREATE TABLE menu (
  id serial,
  name varchar(50) NOT NULL,
  price numeric(4, 2) NOT NULL,
  type varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE orders (
  id serial,
  PRIMARY KEY (id)
);

CREATE TABLE order_map(
  id serial,
  menu_id INT,
  orders_id INT,
  quantity INT,
  PRIMARY KEY(id),
  FOREIGN KEY(menu_id) REFERENCES menu (id),
  FOREIGN KEY(orders_id) REFERENCES orders (id)
);


INSERT INTO menu (name, price, type) VALUES ('Beefburger', 10.00, 'Burgers');
INSERT INTO menu (name, price, type) VALUES ('Cheeseburger', 12.00, 'Burgers');
INSERT INTO menu (name, price, type) VALUES ('Stilton burger', 14.50, 'Burgers');
INSERT INTO menu (name, price, type) VALUES ('Lamb Burger', 13.00, 'Burgers');
INSERT INTO menu (name, price, type) VALUES ('Chips', 4.00, 'Sides');
INSERT INTO menu (name, price, type) VALUES ('Onion Rings', 4.00, 'Sides');
INSERT INTO menu (name, price, type) VALUES ('Cajun Fries', 5.00, 'Sides');
INSERT INTO menu (name, price, type) VALUES ('Coleslaw', 3.00, 'Sides');
INSERT INTO menu (name, price, type) VALUES ('Strawberry Cheesecake', 7.00, 'Desserts');
INSERT INTO menu (name, price, type) VALUES ('Churros', 6.00, 'Desserts');
INSERT INTO menu (name, price, type) VALUES ('Ice Cream', 6.00, 'Desserts');
INSERT INTO menu (name, price, type) VALUES ('Lemonade', 3.00, 'Drinks');
INSERT INTO menu (name, price, type) VALUES ('Cola', 3.00, 'Drinks');
INSERT INTO menu (name, price, type) VALUES ('Banana Milkshake', 4.50, 'Drinks');




INSERT INTO orders VALUES (1);
ALTER SEQUENCE orders_id_seq RESTART WITH 2 INCREMENT BY 1;

INSERT INTO order_map (menu_id, quantity, orders_id) VALUES (1, 2, 1);
INSERT INTO order_map (menu_id, quantity, orders_id) VALUES (5, 2, 1)


-- Attempting an extra toppings menu

CREATE TABLE toppings (
  id serial,
  name varchar(50) NOT NULL,
  price numeric(4, 2) NOT NULL,
  PRIMARY KEY (id)
  )

  CREATE TABLE toppings_map (
    id serial,
    toppings_id INT,
    quantity INT,
    order_map_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (toppings_id) REFERENCES toppings (id),
    FOREIGN KEY (order_map_id) REFERENCES order_map (id)
  )
