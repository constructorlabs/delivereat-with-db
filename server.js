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



app.get('/api/menu/', (req, res) => {
  const menuPromise = db.any('SELECT * FROM MENU')
  const mostPopPromise = db.any(`SELECT menu.*, COUNT(menu.id)
                                 FROM menu, order_map
                                 WHERE order_map.menu_id = menu.id
                                 GROUP BY menu.id
                                 ORDER BY count DESC
                                 LIMIT 4
                                 `)
  const toppingsPromise = db.any('SELECT * FROM TOPPINGS')

  Promise.all([menuPromise, mostPopPromise, toppingsPromise])
    .then(data => res.json(data))
    .catch(error => res.json({error: error.message}))
})


//post an order
app.post('/api/orders', (req, res) => {
  db.one('INSERT INTO orders VALUES (default) RETURNING id;')
  .then(response => {
    const orderId = response.id
    const order = req.body
    const orderKeys = Object.keys(order)
    return Promise.all(orderKeys.map(item => {
      const menuId = order[item].id
      const quantity = order[item].quantity
      const toppings = order[item].toppings
      return db.one('INSERT INTO order_map (menu_id, quantity, orders_id)VALUES($1, $2, $3) RETURNING id', [menuId, quantity, orderId])
      .then(orderMapResponse => {
        return Promise.all(toppings.map((item) => {
          const toppingId = item.toppingId
          const toppingQuantity = item.quantity
          const orderMapId = orderMapResponse.id
          return db.none('INSERT INTO toppings_map (toppings_id, quantity, order_map_id) VALUES ($1, $2, $3)', [toppingId, toppingQuantity, orderMapId])
        }))
      })
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
