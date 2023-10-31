const express = require('express');
const router = express.Router();
const con = require('../../db');


router.update('/', (req, res) => {
    const id = req.body.id;
    const review_rate = req.body.review_rate;
    const review_text = req.body.review_text;

    const query = `UPDATE reviews SET review_rate = ?, review_text = ? WHERE id = ?`;

    con.query(query, [review_rate, review_text, id], function (err, results) {
        if (err) 
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else 
        {
            res.status(200).send({
                success: 1,
                info: 'Review succesfully edited'
            })
        }
    });
})

module.exports = router;
