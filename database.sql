create database food_heaven;

  create table menu(
    id serial,
    name varchar(50) NOT NULL UNIQUE,
    price float(2) NOT NULL,
    PRIMARY KEY (id)
  );

  CREATE TABLE "order" (
  id serial primary key
);

create table menu_order(
  id serial primary key,
  menu_id int NOT NULL,
  order_id int NOT NULL,
  quantity int NOT NULL,
  foreign key(menu_id) references menu(id),
  foreign key(order_id) references "order"(id)

)

INSERT INTO menu(name, price) VALUES ('Taro Dumplings',5);
INSERT INTO menu(name, price) VALUES ('Steamed Egg (v)',5);
INSERT INTO menu(name, price) VALUES ('XO Bone Marrow Cornish King Scallop',7);
INSERT INTO menu(name, price) VALUES ('Sweet & Sour Balsamic Aubergine (v)',7);
INSERT INTO menu(name, price) VALUES ('Mapo Tofu (v)',12);
INSERT INTO menu(name, price) VALUES ('Chilli Egg Drop Crab & Salmon Roe',18);
INSERT INTO menu(name, price) VALUES ('Char Siu Iberico Pork',20);
INSERT INTO menu(name, price) VALUES ('Black Mountain Goose',30);
INSERT INTO menu(name, price) VALUES ('Strawberry Cheesecake',6);
INSERT INTO menu(name, price) VALUES ('Soufflé',6);

alter table menu add column image_name text;
update menu set image_name='Taro Dumplings.jpg' where id=1;
update menu set image_name= 'Steamed Egg (v).jpg' where id=2;
update menu set image_name='XO Bone Marrow Cornish King Scallop.jpg' where id=3;
update menu set image_name='Sweet & Sour Balsamic Aubergine (v).jpg' where id=4;
update menu set image_name='Mapo Tofu (v).jpg' where id=5;
update menu set image_name='Chilli Egg Drop Crab & Salmon Roe.jpg' where id=6;
update menu set image_name='Char Siu Iberico Pork.jpg' where id=7;
update menu set image_name='Black Mountain Goose.jpg' where id=8;
update menu set image_name='Strawberry Cheesecake.jpg' where id=9;
update menu set image_name='Soufflé.jpg' where id=10;
