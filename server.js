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

// dummy menu object to show object structure
const menu = {
  1: {
    course: "starter",
    id: 1,
    img: "mixed-salad.jpg",
    item: "Mixed Salad",
    price: "6.00"
  },
  2: {
    course: "starter",
    id: 2,
    img: "fried-chicken.jpg",
    item: "Fried Chicken",
    price: "7.00"
  }
}

// dummy menu_purchases object to show object structure
const menu_purchases = {
  items: {
    1: { 
      id: 1,  
      quantity: 2
    },
    2: { 
      id: 2, 
      quantity: 4
    }
  },
  name: "Matt",
  telephone: "07901 972 811"
}

app.get('/', function(req, res){
  res.render('index');
});

// get all menu items from menu table
app.get('/api/menu', function(req, res){
  db.any('SELECT * FROM menu')
    .then(menu => {
      const menuObject = menu.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      return res.json(menuObject);
    })
    .catch(function(error) {
        res.json({error: error.message});
    });
});

// get all purchases from menu_purchase table
app.get('/api/purchases', function(req, res){
  db.any('SELECT * FROM menu_purchase')
    .then(purchases => {
      const purchasesObject = purchases.reduce((acc, item) => {
          acc[item.id] = item
          return acc;
        }, {})
      return res.json(purchasesObject);
    })
    .catch(function(error) {
        res.json({error: error.message});
    });
});

// add a single purchase to menu_purchase table
app.post('/api/purchase', (req, res) =>{
  // 1. insert items, name, telephone and time from body request into "purchase" table
  const { items, name, telephone } = req.body; 
  db.one(`INSERT INTO purchase (name, telephone, created_at) VALUES($1, $2, NOW()) RETURNING id`, [name, telephone]) 
  .then(result => {
    // set RETURNING id from INSERT INTO
    const orderId = result.id; 
    // 2. insert into "menu_purchase" table for each item
    return Promise.all(Object.values(items).map(item => {
      return db.none(`INSERT INTO menu_purchase (quantity, menu_id, purchase_id) VALUES($1, $2, $3)`, [item.quantity, item.id, orderId]);
      }))
      .then(() => orderId); // orderId is return when Promise.all is complete
    })
  .then(orderId => {
    // sendSMS() here
    return res.json({ orderId: orderId })
  })
  .catch(error => res.json({ error: error.message }));
});

function sendSMS(orderId, customerTel) {
  // https://www.twilio.com/docs/libraries/node

  var accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
  var authToken = 'your_auth_token';   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken);

  client.messages.create({
      body: `Thank you. Your ID is ${orderId}`,
      to: customerTel,  // Text this number
      from: '+447446494074' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
}

// get a single purchase from menu_purchase table
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