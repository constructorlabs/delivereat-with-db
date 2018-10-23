require('dotenv').config();
const client = require('twilio')(process.env.accountSid, process.env.authToken);

const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const express = require('express');
const app = express();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function(req, res){
  db.any('SELECT * FROM menu')
  .then(function(data) {
    res.json(data);
  })
  .catch(function(error){
    res.json({error: error.message})
  })
})

app.get('/api/menu/:itemId', function(req, res){
  const menuId = req.params.itemId;
  db.one('SELECT menu.id ,menu.name, menu.price, menu.description, menu.vegan, menu.photourl FROM menu WHERE id=$1', [menuId])
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      res.json({error: error.message})
    })
})

app.post('/api/order', function(req, res){
  const { items, name, address, telephone } = req.body;
  db.one("INSERT INTO orders (id, name, address, telephone) VALUES (DEFAULT, $1, $2, $3) RETURNING id", [name, address, telephone])
    .then(result => {
      const orderId = result.id;

      return Promise.all(Object.entries(items).map(([menuItemId, quantity]) => {
        return db.none(
          "INSERT INTO order_content (menu_id, orders_id, quantity) VALUES ($1, $2, $3)",
          [menuItemId, orderId, quantity]
        );
      }))
      .then(() => client.messages
        .create({
           body: `Your order number is ${orderId}. Listen out for the doorbell!`,
           from: '+447447980922',
           to: telephone
         })
        .then(message => console.log(message.sid))
        .done()
      )
      .then(() => orderId);
    })
    .then(orderId => res.json({ orderId: orderId }))
    .catch(error => res.json({ error: error.message }));
});



app.listen(8080, function() {
  console.log('Listening on port 8080!');
});
