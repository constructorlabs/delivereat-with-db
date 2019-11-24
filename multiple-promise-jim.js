const purchases = {
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

app.post("/order", (req, res) => {
  // 1. insert into "order" table
  db.one("INSERT INTO order (id) VALUES (DEFAULT) RETURNING id")
  .then(result => {
      const orderId = result.id;
      const { items } = req.body;
      // 2. insert into "order_item" table for each item
      return Promise.all(items.map(item => {
        return db.none(
          "INSERT INTO order_item (menu_id, order_id, quantity) VALUES ($1, $2, $3)",
          [item.menuItemId, orderId, item.quantity]
        );
      })).then(() => orderId);
    })
  .then(orderId => res.json({ orderId: orderId }))
  .catch(error => res.json({ error: error.message }));
});