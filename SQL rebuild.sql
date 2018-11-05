DROP TABLE anorder, menu, order_basket

CREATE TABLE menu (
id SERIAL,
name TEXT NOT NULL,
price numeric (4,2) default 0 NOT NULL,
quantity numeric (5) default 0 NOT NULL,
type TEXT NOT NULL,
image TEXT,
header TEXT,
description TEXT,
more_info TEXT,
PRIMARY KEY (id)
);

CREATE TABLE order_basket (
id serial,
time TIMESTAMP default current_timestamp NOT NULL,
cust_name TEXT,
email TEXT NOT NULL,
cust_address TEXT NOT NULL,
postcode TEXT,
phone TEXT,
PRIMARY KEY (id)
);

CREATE TABLE anorder (
id serial,
menu_id INT NOT NULL,
quantity NUMERIC(5,0) NOT NULL,
order_basket_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (order_basket_id) REFERENCES order_basket (id),
FOREIGN KEY (menu_id) REFERENCES menu (id)
);

-- INSERT INTO menu VALUES (1, 'Steak Hache', 11, 100, 'main', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg');
-- INSERT INTO menu VALUES (2, 'Raclette', 9, 100, 'main', 'https://www.lavenderandlovage.com/wp/wp-content/uploads/2015/02/Tartiflette-15-1024x711.jpg');
-- INSERT INTO menu VALUES (3, 'Iles flottantes', 4, 100, 'dessert', 'https://www.cookomix.com/wp-content/uploads/2017/11/iles-flottantes-thermomix-800x600.jpg');
-- INSERT INTO menu VALUES (4, 'Foie Gras', 10, 100, 'starter', 'https://s23991.pcdn.co/wp-content/uploads/2010/12/seared-foie-gras-recipe.jpg');
-- ALTER SEQUENCE menu_id_seq RESTART WITH 5 INCREMENT BY 1;




INSERT INTO menu VALUES (0, 'SMASHED AVO, OUR WAY', 7, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Smashed avo on Dusty Knuckle seeded rye', 'Smashed avo on Dusty Knuckle seeded rye w/ walnutand sumac crumble, chilli oil and orange zest.', 'Add a poached egg or two £1.25 / £2.50 add hot smoked salmon £4.5');
INSERT INTO menu VALUES (1, 'VEGAN DREAMING', 8.5, 100, 'brunch', 'https://www.lavenderandlovage.com/wp/wp-content/uploads/2015/02/Tartiflette-15-1024x711.jpg', 'Dusty Knuckle potato sour dough served w/ homemade beetroot relish', 'Dusty Knuckle potato sour dough served w/ homemade beetroot relish, avocado, confit mushrooms, watercress and mixed seed salad with homemade coriander and cashew cream.', 'Un vegan it…add 2 poached eggs £2.5 Seriously un vegan it! add bacon £2.5');
INSERT INTO menu VALUES (2, 'OKONOMI-YUMMI!', 10.5, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Our take on the Japanese classic', 'Our take on the Japanese classic. Thick savoury Japanese pancake (gf) w/ avocado, a poached egg & all the trimmings...think tonkatsu sauce, homemade miso kewpie, bonito fish flakes, fried shallots.', 'Add crispy bacon or halloumi £2.5 Add hot smoked salmon £4.5 Make it veggie just ask ; )');
INSERT INTO menu VALUES (3, 'CAULIFLOWER TOAST', 9.5, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Homemade roasted cauliflower bread (gf)', 'Homemade roasted cauliflower bread (gf) served w/ our fennel jam, avocado, a poached   egg drizzled with toasted sunflower tahini.', 'Add halloumi or crispy bacon £2.5');
INSERT INTO menu VALUES (4, 'AUTUMN HASH', 11.5, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Potato and smoked mozzarella pikelet (gf)', 'Potato and smoked mozzarella pikelet (gf) (think hash brown!) served w/ warm celeriac remoulade, bacon crumb, a fried egg and homemade red pepper ketchup', 'Add bacon or halloumi £2.5 Make it veggie...just ask:)');
INSERT INTO menu VALUES (5, 'UP STREAM DREAM', 9.5, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Home hot smoked salmon w/ warm pearled spelt', 'Home hot smoked salmon w/ warm pearled spelt & honeyroasted pumpkin salad, salsa verde and a poached egg.', 'Add avocado £2.5');
INSERT INTO menu VALUES (6, 'BACON BENEDICT', 9.5, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Maple glazed crispy bacon served on a brick lane bagel', 'Maple glazed crispy bacon served on a brick lane bagel w/ spinach, poached eggs and hollandaise sauce', 'Swap bacon for house hot smoked salmon £3 Add Avocado £2.5');
INSERT INTO menu VALUES (7, 'CHILLI POACHED EGGS', 9.5, 100, 'brunch', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Dusty Knuckle potato sour dough served w/ wilted spinach', 'Dusty Knuckle potato sour dough served w/ wilted spinach, whipped garlic yoghurt, poached eggs and chilli & dill butter.', 'Add bacon, halloumi or avocado £2.5');
INSERT INTO menu VALUES (8, 'CLEMENTINE & CASHEW SMOOTHIE', 5.5, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg');
INSERT INTO menu VALUES (9, 'SUPER GREEN SMOOTHIE', 5.5, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'w/ avocado, spinach, banana, matcha, honey');
INSERT INTO menu VALUES (10, 'MACADAMIA & BANANA SMOOTHIE', 5.5, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg');
INSERT INTO menu VALUES (11, 'ESPRESSO SMOOTHIE', 4.5, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'w/ espresso, banana, dates, milk');
INSERT INTO menu VALUES (12, 'ORANGE JUICE', 3, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg');
INSERT INTO menu VALUES (13, 'APPLE JUICE', 3, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg');
INSERT INTO menu VALUES (14, 'CLEANSE', 3, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'carrot, lemon and ginger');
INSERT INTO menu VALUES (15, 'FUEL', 3, 100, 'drinks', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'beetroot, apple and celery');
INSERT INTO menu VALUES (17, 'BLONDIE', 3.5, 100, 'dessert', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg', 'Matcha and White Chocolate' );
INSERT INTO menu VALUES (18, 'BROWNIE', 3.5, 100, 'dessert', 'https://media.blueapron.com/recipes/2121/square_newsletter_images/1490637106-4-0003-6001/403_2PRE07-steak-frites-18311_WEB_SQ_hi_res.jpg');

ALTER SEQUENCE menu_id_seq RESTART WITH 19 INCREMENT BY 1;

INSERT INTO order_basket VALUES (1, '2011-05-16 15:36:38', 'Chris P','15 Dekker','E8 3FS', '07714205581');
INSERT INTO order_basket VALUES (2, '2011-05-16 15:36:38','Chris P','15 Dekker','E8 3FS', '07714205581');
INSERT INTO order_basket VALUES (3, '2011-05-16 15:36:38','Chris P','15 Dekker','E8 3FS', '07714205581');
ALTER SEQUENCE order_basket_id_seq RESTART WITH 4 INCREMENT BY 1;

INSERT INTO anorder VALUES (1, 2, 1, 1);
INSERT INTO anorder VALUES (2, 4, 3, 1);
INSERT INTO anorder VALUES (3, 3, 2, 2);
INSERT INTO anorder VALUES (4, 1, 2, 3);
ALTER SEQUENCE anorder_id_seq RESTART WITH 5 INCREMENT BY 1;







