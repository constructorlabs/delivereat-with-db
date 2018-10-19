require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
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
      const menuObject = data.reduce((acc, item) => {
        acc[item.id] = item
        return acc
      }, {})
        res.json(menuObject);
    })
    .catch(function(error) {
        res.json({error: error.message});
    });
});

app.post('/api/order', function(req, res){

  // 1. insert into "order" table
  db.one(`INSERT INTO "order"(id, ordertime) VALUES (DEFAULT, NOW()) RETURNING id, ordertime`)

  .then(result => {
    const orderId = result.id;
    const items = Object.values(req.body);

  // 2. insert into "menu_order" table for each item

  return Promise.all(items.map(orderItem => {
    
    const {id, quantity} = orderItem; 
      
    return db.none(`INSERT INTO menu_order (order_id, menu_id, quantity) VALUES ($1, $2, $3)`, [orderId, id, quantity, ]
    );
    
    })).then(() => orderId);

  })
    .then(orderId => res.json({ orderId: orderId }))
    .catch(error => res.json({ error: error.message}))
    
});
  
app.get('/api/order', function(req, res){
  db.any('SELECT * FROM menu_order')
    .then(function(data) {
        res.json(data);
    })
    .catch(function(error) {
        res.json({error: error.message});
    });
});

// app.get('/api/order/:id', function(req, res){
//   const id = req.params.id;
//   db.any('SELECT menu.name, menu.price, menu_order.order_id, menu_order.quantity, menu_order.menu_id FROM menu_order, menu WHERE menu_order.menu_id = menu.id)
//       .then(function(data) {
//           res.json(data);
//       })
//       .catch(function(error) {
//           res.json({error: error.message});
//       });
// });

app.listen(8080, function(){
  console.log('Listening on port 8080');
});
