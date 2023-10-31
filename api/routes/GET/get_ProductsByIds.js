const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.post('/', (req, res) => {
    const query = 'SELECT id, name, price FROM products WHERE id IN (?)';
    const ids = req.body.idList;

    const convertedIds = `${ids.join(',')}`;

    con.query(query, [ids], (err, result) => {
        if(err)
        {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error'
            });
        }
        else
        {
            if(result.length === 0)
            {
                res.status(404).send({
                    success: 0,
                    info: 'No products found'
                });
            }
            else
            {
                result.forEach(element => {
                    const product_image = `http://localhost:8080/images/products/${element.id}/image1.png`;
                    element.image = product_image;
                });
                
                res.status(200).send({
                    success: 1,
                    result: result
                })
            }
            
        }
    })
})

module.exports = router;