require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const pgp = require("pg-promise")();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const notifyServiceSid = process.env.TWILIO_NOTIFY_SERVICE_SID;

const client = require("twilio")(accountSid, authToken);

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/menu", function(req, res) {
  db.any("select * from menu")
    .then(data => res.json(data))
    .catch(error => res.status(400).json({ error: "invaid request" }));
});

app.post("/order", function(req, res) {
  const orderItems = req.body;
  const { name, phone } = orderItems.user;
  db.one(`insert into "user"(name, phone) values ($1,$2 ) returning id`, [
    name,
    phone
  ])
    .then(data => {
      db.one(
        `insert into "order"(id, user_id) values(default, $1) returning id`,
        [data.id]
      )
        .then(data => {
          client.notify
            .services(notifyServiceSid)
            .notifications.create({
              toBinding: JSON.stringify({
                binding_type: "sms",
                address: `${phone}`
              }),
              body: `Hi ${name}! Your order (id: ${
                data.id
              }) is accepted. We are preparing your food.`
            })
            .then(notification => console.log(notification.sid))
            .catch(error => console.log(error.message));

          return Promise.all(
            Object.values(orderItems.items).map(item => {
              const { menu_id, quantity } = item;
              return db.none(
                `insert into menu_order(menu_id, order_id,quantity)
            VALUES($1, $2, $3)`,
                [menu_id, data.id, quantity]
              );
            })
          ).then(() => data.id);
        })
        .then(orderId =>
          res.json({ order_id: orderId, message: "new order accepted" })
        );
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

app.delete("/order/:id", function(req, res) {
  const order_id = req.params.id;
  db.none(`delete from menu_order where order_id=$1`, [order_id]).then(data => {
    db.none(`delete from "order" where "order".id=$1`, [order_id])
      .then(response =>
        res.status(204).json({ order: `order ${order_id} deleted` })
      )
      .catch(error => res.status(400).json({ error: error.message }));
  });
});

app.get("/order/:id", function(req, res) {
  const order_id = req.params.id;
  db.any(
    `select menu_id, menu.name, menu.price, menu.image_name, quantity
          from menu, menu_order
          where menu.id = menu_order.menu_id
          and menu_order.order_id = $1 `,
    [order_id]
  )
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ error: error.message }));
});

app.get("/order", function(req, res) {
  db.any(
    `select order_id, menu_id, menu.name, menu.price, quantity
          from menu, menu_order
          where menu.id = menu_order.menu_id`
  )
    .then(data => res.json(data))
    .catch(error => res.status(404).json({ error: error.message }));
});

app.delete("/order", function(req, res) {
  db.none(`delete from menu_order`)
    .then(() => {
      db.none(`delete from "order"`).then(response =>
        res.status(204).json({ order: `Order table is empty` })
          .catch(error => res.status(400).json({ error: error.message }))
      );
    })
    .catch(error => res.status(400).json({ error: error.message }));
});

app.listen(8080, function() {
  console.log("Listening on port 8080");
});
