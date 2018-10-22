require('dotenv').config();

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
    .then(function(data){
      res.json(data)
    })
    .catch(function(error){
      res.json({error:error.message})
    })
})


app.post("/api/order",(req,res) => {
  const {items, name, email, address, postcode, phone} = req.body;
  db.one("INSERT INTO order_basket(cust_name, cust_address, email, postcode, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id", [name, address, email, postcode, phone]).then(
    result => {
      const orderId = result.id;
      Promise.all(items.map(item => {
        return db.none(
          "INSERT INTO anorder (menu_id, order_basket_id, quantity) VALUES ($1, $2, $3)",
          [item.menuItemId, orderId, item.quantity]
          
        )
      }) 
      )
      .then(() => orderId)
    }

  )
  .then(orderId =>  {
    console.log('catch 3');
    res.json({orderId: orderId, success: true, message: 'Brace yourself for the Kale'})
  })
  .catch(error => {
    console.log(error);
    res.json({error: error.message})
  });
});

app.use(function(req, res, next) {
  return res.status(404).send({ message: `Route ${req.url} not found.` });
});
  // Handle 404
//   app.use(function(req, res) {
//     res.status(400);
//    res.render('404.jade', {title: '404: File Not Found'});
// });



app.listen(8080, function(){
  console.log('Listening on port 8080');
});
