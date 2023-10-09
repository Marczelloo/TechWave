const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.delete('/', (req, res) => {
    const review_id = req.body.review_id;
    const query = "DELETE FROM reviews WHERE id = ?";

    con.query(query, [review_id], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            const review = result;

            if(review.affectedRows == 1)
            {
                res.status(200).send({ 
                    success: 1,
                    info: 'Review deleted successfully'
                })
            }
            else
            {
                res.status(404).send({
                    success: 0,
                    info: 'Review not found'
                })
            }
        }
    });
})

module.exports = router;