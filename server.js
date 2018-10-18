require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pgp = require('pg-promise')();
const db =  pgp({
  host: 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
})

app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.set('view engine', 'hbs');


app.get('/', function(req, res){
  res.render('index');
});



//get menu
app.get('/api/menu/', (req, res) => {
  db.any('SELECT * FROM menu')
  .then(data => {
    res.json(data)
  })
  .catch(error => {
    res.json({error: error.message})
  })
})


//post an order
app.post('/api/orders', (req, res) => {
  db.one('INSERT INTO orders VALUES (default) RETURNING id;')
  .then(response => {
    const orderId = response.id
    const order = req.body
    const orderKeys = Object.keys(order)
    return Promise.all(orderKeys.map(item => {
      const menuId = order[item].menuId
      const quantity = order[item].quantity
      return db.none('INSERT INTO order_map (menu_id, quantity, orders_id)VALUES($1, $2, $3)', [menuId, quantity, orderId])
    }))
      .then(() => orderId)
  })
  .then(orderId => {
    res.json({orderId})
  })
  .catch(error => {
    res.json({error: error.message})
  })
})



app.listen(8080, function(){
  console.log('Listening on port 8080');
});
