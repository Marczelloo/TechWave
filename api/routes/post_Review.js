const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.post('/', (req, res) => {
    const id_product = req.body.id_product;
    const id_user = req.body.id_user;
    const review_rate = req.body.review_rate;
    const review_text = req.body.review_text;
    const review_date = req.body.review_date;

    const unixTimestampInMilliseconds = review_date;
    const date = new Date(unixTimestampInMilliseconds);

    const timezoneOffsetInMinutes = 120;
    const adjustedDate = new Date(date.getTime() + timezoneOffsetInMinutes * 60 * 1000);

    const sqlDateFormat = `${adjustedDate.toISOString().slice(0, 19).replace('T', ' ')}`;
    
    const query = `INSERT INTO reviews(id_product, id_user, review_rate, review_text, review_date) 
    VALUES(?, ?, ?, ?, ?)`;

    con.query(query, [id_product, id_user, review_rate, review_text, sqlDateFormat], function (err, results) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            res.send({
                success: 1,
                info: 'Review succesfully added'
            })
        }
    })

})

module.exports = router;