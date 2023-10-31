const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.get('/:name', (req, res) => {
    const query = "SELECT id, name, price FROM products WHERE name LIKE ? LIMIT 5";
    const name = `%${req.params.name}%`;

    con.query(query, [name], (err, result) => {
        if(err)
        {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error'});
        }
        else
        {
            result.forEach(element => {
                const product_image = `http://localhost:8080/images/products/${element.id}/image1.png`;
                element.image = product_image;
            });

            if(result.length === 0)
            {
                res.status(404).send({
                    success: 0,
                    info: 'No products found'});
            }
            else
            {
                res.status(200).send({
                    success: 1,
                    result,
                });
            }
        }
    })
});

module.exports = router;