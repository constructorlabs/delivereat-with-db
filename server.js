// CONFIG//
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const pgp = require('pg-promise')();

const app = express();
app.use(bodyParser.json());
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

// ROUTES//
app.get('/', (req, res) => res.render('index')); // Render app

app.get('/api/menu', (req, res) => {
  // Get all menu items
  db.many('SELECT * FROM menu')
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.get('/api/menu/:menuItemId', (req, res) => {
  // Get menu item by id
  db.one('SELECT * FROM menu WHERE id=$1', [req.params.menuItemId])
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.post('/api/order', (req, res) => {
  // Post new order
  const status = 'new';
  const date = new Date();
  const { items, phone } = req.body;
  db.one(
    `INSERT INTO "order" (status, time, phone) 
          VALUES ($1, $2, $3)
          RETURNING id`,
    [status, date.toLocaleString(), phone],
  )
    .then((data) => {
      const orderId = data.id;
      return Promise.all(
        items.map((item) => {
          const menuId = item[0];
          const quantity = item[1];
          return db.none(
            `INSERT INTO menu_order (order_id, menu_id, quantity)
                        VALUES ($1, $2, $3)`,
            [orderId, menuId, quantity],
          );
        }),
      ).then(() => orderId);
    })
    .then((data) => {
      const checkoutMsg = `
        Thank you for placing an order with Zing. Your order number is ${data}.
        One of our surprisingly attractive baristas is preparing your coffee now.
        `;
      twilioClient.messages
        .create({
          body: checkoutMsg,
          from: '+447481339376',
          to: phone,
        })
        .then((message) => console.log(message.sid))
        .done();
      res.json(data);
    })
    .catch((error) => res.json({ error: error.message }));
});

app.get('/api/order', (req, res) => {
  // Get all open orders
  db.many('SELECT * FROM "order"')
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

app.patch('/api/order/:orderId', (req, res) => {
  // Update order status
  const { orderId } = req.params;
  const newStatus = req.body.status;
  db.one(
    `UPDATE "order" SET status = $1 WHERE id = $2
          RETURNING *`,
    [newStatus, orderId],
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error.message }));
});

// START LISTENING//
app.listen(8080, () => {
  console.log('Listening on port 8080');
});
