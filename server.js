require('dotenv').config();

const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const express = require('express');
const app = express();
app.use('/static', express.static('static')); 
app.set('view engine', 'hbs');

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());

const menu = {
  1: {
    id: 1,
    item: "Mixed Salad",
    price: "6.00",
    img: "mixed-salad.jpg",
    course: "starter"
  },
  2: {
    id: 2,
    item: "Fried Chicken",
    price: "7.00",
    img: "fried-chicken.jpg",
    course: "starter"
  }
}

const menu_purchases = {
  "items": {
      "1": { 
          "id": 1, 
          "quantity": 2 
      },
      "2": { 
          "id": 2, 
          "quantity": 3 
      }
  },
  "name": "Matt",
  "tel": "07901 972 811"
}

app.get('/', function(req, res){
  res.render('index');
});

app.get('/api/menu', function(req, res){
    db.any('SELECT * FROM menu')
      .then(data => res.json(data))
      .catch(function(error) {
          res.json({error: error.message});
      });
});

app.post('/api/purchase', (req, res) =>{
  // 1. insert items, name, tel and time from body request into "purchase" table
  const { items, name, tel } = req.body; 
  db.one(`INSERT INTO purchase (name, tel, created_at) VALUES($1, $2, NOW()) RETURNING id`, [name, tel]) 
  .then(result => {
    // set RETURNING id from INSERT INTO
    const orderId = result.id; 
    // 2. insert into "menu_purchase" table for each item
    return Promise.all(Object.values(items).map(item => {
      return db.none(`INSERT INTO menu_purchase (quantity, menu_id, purchase_id) VALUES($1, $2, $3)`, [item.quantity, item.id, orderId]);
      }))
      .then(() => orderId); // orderId is return when Promise.all is complete
    })
  .then(orderId => res.json({ orderId: orderId }))
  .catch(error => res.json({ error: error.message }));
});

app.get('/api/purchase/:id', function(req, res){
  db.any('SELECT * FROM menu_purchase WHERE purchase_id=$1', [req.params.id])
    .then(menuPurchase => {
      if (menuPurchase.length) {
        return res.json(menuPurchase)
      } else {
        res.json({error: `Error: Your order with ID = ${req.params.id} could not be found, please contact us for help`});
      }
    })
    .catch(function(error) {
        res.json({error: error.message});
    });
});

app.listen(8080, function(){
  console.log('Listening on port 8080');
});