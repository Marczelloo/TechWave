const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.get('/:id', (req, res) => {
    const id_product = req.params.id;
    const query = 'SELECT id_user, review_rate, review_text, review_date FROM reviews WHERE id_product = ?';

    con.query(query, [id_product], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            const review = result;

            if(result.length === 0)
            {
                res.send({
                    success: 0,
                    info: 'no reviews for this product'
                })
            }
            else
            {
                res.send({
                    success: 1,
                    review: review,
                })
            }

            
        }
    })
})

module.exports = router;