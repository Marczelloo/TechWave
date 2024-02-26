const express = require('express');
const router = express.Router();
const con =  require('../../db.js');

router.get('/:id', (req, res) => {
  const query = `SELECT id, date, products_id, total_price, status FROM orders WHERE user_id = ${req.params.id}`;

con.query(query, (err, result) => {
    if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    } else {
        const orders = result;
        
        res.send({
            orders: orders
        });
    }
    });
});

module.exports = router;