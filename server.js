//CONFIG//
require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

app.use('/static', express.static('static'));
app.set('view engine', 'hbs');

//ROUTES//
app.get('/', (req, res) => res.render('index')); //Render app

app.get('/api/menu', (req,res) => { //Get all menu items
  db.many('SELECT * FROM menu')
    .then(data => res.json(data))
    .catch(error => res.json({error: error.message}));
});

app.get('/api/menu/:menuItemId', (req,res) => { //Get menu item by id
  db.one(`SELECT * FROM menu WHERE id=$1`, [req.params.menuItemId])
    .then(data => res.json(data))
    .catch(error => res.json({error: error.message}));
});

app.post('/api/order', (req,res) => { //Post new order
  const status = 'new';
  const date = new Date();
  const contents = req.body;
  db.one(`INSERT INTO "order" (status, time) 
          VALUES ($1, $2)
          RETURNING id`, [status, date.toLocaleString()])
    .then(data => {
      contents.forEach(item => {
        const orderId = data.id;
        const menuId = item[0];
        const quantity = item[1];
        db.one(`INSERT INTO menu_order (order_id, menu_id, quantity)
                VALUES ($1, $2, $3)
                RETURNING id`, [orderId, menuId, quantity])
          .then(data => res.json(data))
          .catch(error =>res.json({error: error.message}));
      });
    });
});

// //order route: get open orders
// app.get('/orders', (req,res) => res.json(getOpenOrders()));



// //order route: patch order status
// app.patch('/orders/:orderId', (req,res) => res.json(patchOrder(req.params.orderId, req.body)));


//START LISTENING//
app.listen(8080, function(){
  console.log('Listening on port 8080');
});
