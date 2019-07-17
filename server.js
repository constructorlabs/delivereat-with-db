// "use strict";
require("dotenv").config();

("use strict");
var rootCas = require("ssl-root-cas/latest").create();

// default for all https requests
// (whether using https directly, request, or another module)
require("https").globalAgent.options.ca = rootCas;

const fetch = require("node-fetch");
const superagent = require("superagent");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const express = require("express");
const app = express();
const db = pgp({
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

app.use(bodyParser.json());
app.use("/static", express.static("static"));
app.set("view engine", "hbs");

const port = process.env.PORT || 8080;

app.get("/", function(req, res) {
  res.render("index");
});

/**
 * example of object to be passed into app.post("/api/order"
{
  "items": [
    { "item_id": 1, "quantity": 10 },
    { "item_id": 2, "quantity": 3},
    { "item_id": 3, "quantity": 2},
    { "item_id": 9, "quantity": 41}
  ],
  "details_of_order": "Mario, 012345678, please kock 3 times"
}
 */

app.get("/d/page/:page", function(req, res) {
  const page = req.params.page;
  let pageNumber = "";
  if (page !== 1) {
    pageNumber = `page/${page}`;
  }

  const url = `https://demotywatory.pl/${pageNumber}`;

  superagent
    .get(url)
    .query()
    .end(function(err, response) {
      if (err) {
        res.json({
          confirmation: "fail",
          message: err
        });
        return;
      }
      $ = cheerio.load(response.text);

      let obj = [];
      $(".demots .pic .demot_pic img").each(function(i, el) {
        // this === el;
        // return el.find($("img").attr("src"));
        // obj[i] = $(this).text();
        // console.log($(this).text());
        // console.log(el);
        obj[i] = $(this).attr("src");
      });
      console.log(obj);

      res.send(obj);
    });
  // var obj;
  // let savedData = {};
  // let i = 0;
  // let da = [];

  // osmosis
  //   .get(url)
  //   // .paginate("img[src]", 5)
  //   .find(".demot_pic a")
  //   // .follow("@src")
  //   .set({ img: ["img@src"] })
  //   .data(function(data) {
  //     // console.log(data);
  //     // savedData.push(data);
  //     // res.json(JSON.stringify(savedData));
  //     if (data.img === []) {
  //       console.log("sdsa");
  //     } else {
  //       console.log(typeof data.img);

  //       da[i] = data;
  //       // console.log("no datat" + data);

  //       i++;
  //     }
  //     savedData = Object.assign({}, savedData, data);
  //   })
  //   // .done(function() {
  //   //   console.log("da");

  //   //   fs.writeFile("data.json", JSON.stringify(savedData, null, 4), function(
  //   //     err
  //   //   ) {
  //   //     if (err) console.error(err);
  //   //     else console.log("Data Saved to data.json file");
  //   //   });
  //   // })
  //   .log(console.log) // enable logging
  //   .error(console.error); // in case there is an error found.
  // console.log(da);
  // res.json(da);

  // res.send(aaa);
  // });
});

app.post("/demot", (req, res) => {
  // res.json(req.body);

  fetch("https://api.parcelmonkey.co.uk/GetQuote", {}).catch(error => {
    console.log("Server failed to return data: " + error);
    res.json(error);
  });
});

app.post("/api/order", (req, res) => {
  //this will be additional informations to order like name, phone number or how to enter to bulding
  const detailsOfOrder = req.body.details_of_order;
  const deliveryPrice = 1;
  console.log(req.body);

  // 1. insert into "order" table
  db.one(
    "INSERT INTO orders (id, details_of_order, delivery_price) VALUES (DEFAULT, $1, $2) RETURNING id",
    [detailsOfOrder, deliveryPrice]
  )
    .then(result => {
      const orderId = result.id;
      const { items } = req.body;
      // 2. insert into "order_item" table for each item
      return Promise.all(
        items.map(item => {
          return db.none(
            "INSERT INTO order_details (order_id, item_id, quantity) VALUES ($1, $2, $3)",
            [orderId, item.item_id, item.quantity]
          );
        })
      ).then(() => orderId);
    })
    .then(orderId => res.json({ orderId: orderId }))
    .catch(error => res.json({ error: error.message }));
});

app.get("/api/menu", function(req, res) {
  db.any("SELECT * FROM menu")
    .then(data => {
      res.json(data);
    })
    .catch(() => {
      res.json({ error: error.message });
    });
});

app.get("/api/order/:orderId", function(req, res) {
  const orderId = req.params.orderId;
  db.any(
    "SELECT menu.id, menu.name, menu.type, order_details.quantity, orders.delivery_price, orders.details_of_order FROM menu, order_details, orders WHERE order_details.order_id = $1 AND order_details.item_id = menu.id AND orders.id = $1",
    [orderId]
  )
    .then(data => {
      res.json(data);
    })
    .catch(() => {
      res.json({ error: error.message });
    });
});

app.listen(port, function() {
  console.log(`Listening on port number ${port}`);
});
