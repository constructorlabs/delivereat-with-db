CREATE database cafe

DROP TABLE menu_purchase

-- create tables

CREATE table menu (
  id serial PRIMARY KEY,
  item text NOT NULL,
  price numeric(4,2) NOT NULL,
  img text NOT NULL,
  course text NOT NULL
);

-- DROP TABLE menu_purchase
-- DROP TABLE purchase

CREATE table purchase (
  id serial PRIMARY KEY,
  name text NOT NULL,
  telephone text NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE table menu_purchase (
    id serial PRIMARY KEY,
    quantity numeric default 0,
    menu_id smallint,
    purchase_id smallint,
    FOREIGN KEY (menu_id) REFERENCES menu (id),
    FOREIGN KEY (purchase_id) REFERENCES purchase (id)
);

-- insert items into menu table

INSERT INTO menu (item, price, img, course) VALUES ('Mixed Salad', 6, 'mixed-salad.jpg', 'starter');
INSERT INTO menu (item, price, img, course) VALUES ('Fried Chicken', 7, 'fried-chicken.jpg', 'starter');
INSERT INTO menu (item, price, img, course) VALUES ('Vegetable soup', 5, 'vegetable-soup.jpg', 'starter');
INSERT INTO menu (item, price, img, course) VALUES ('Beef stew', 9, 'beef-stew.jpg', 'main');
INSERT INTO menu (item, price, img, course) VALUES ('Fish & chips', 11, 'fish-chips.jpg', 'main');
INSERT INTO menu (item, price, img, course) VALUES ('Pork chops & vegetables', 9, 'pork-and-veg.jpg', 'main');
INSERT INTO menu (item, price, img, course) VALUES ('Chocolate cake', 4, 'chocolate-cake.jpg', 'dessert');
INSERT INTO menu (item, price, img, course) VALUES ('Blueberry cheesecake', 3.50, 'blueberry-cheesecake.jpg', 'dessert');
INSERT INTO menu (item, price, img, course) VALUES ('Trifle', 3, 'trifle.jpg', 'dessert');

-- update for any changes
-- UPDATE menu SET item = 'Pork chops & vegetables', price = 10, img = 'pork-and-veg.jpg'  WHERE id = 6

-- alter columns for any changes
-- ALTER TABLE purchase DROP COLUMN time;
-- ALTER TABLE purchase ADD COLUMN time TIMESTAMP NOT NULL;