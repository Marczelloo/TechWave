const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.post('/', async (req, res) => {
    const maxPrice = req.body.maxPrice;
    const minPrice = req.body.minPrice;
    const orderBy = req.body.orderBy;

    const page = parseInt(req.body.page);
    const itemsPerPage = parseInt(req.body.itemsPerPage);

    const skip = (page - 1) * itemsPerPage;

    let query = 'SELECT id, name, price FROM products WHERE id IN (?)';
    if (maxPrice > 0) {
        query += ` AND price < ${maxPrice}`;
    }
    if (minPrice > 0) {
        query += ` AND price > ${minPrice}`;
    }

    if (orderBy === 'priceAsc') 
    {
        query += ' ORDER BY price ASC';
    } 
    else if (orderBy === 'priceDesc') 
    {
        query += ' ORDER BY price DESC';
    }
    else
    {
        query += ' ORDER BY id';
    }
    query += 'LIMIT ? OFFSET ?';
    
    
    const ids = req.body.idList;

    const total = 'SELECT COUNT(*) AS total FROM products WHERE id IN (?)';

    con.query(query, [ids, itemsPerPage, skip], (err, result) => {
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

                const itemList = result;

                con.query(total, [ids], (err, result) => {
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
                        const maxPage = Math.ceil(result[0].total / itemsPerPage);

                        res.status(200).send({
                            success: 1,
                            result: itemList,
                            maxPage: maxPage,  
                        })
                    }
                })
            }
            
        }
    })
})

module.exports = router;