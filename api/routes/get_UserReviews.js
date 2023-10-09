const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT id, id_product, review_rate, review_text, review_date FROM reviews WHERE id_user = ?';

    con.query(query, [userId], function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: 0,
                message: 'Internal Server Error',
            });
        }

        const reviews = result;

        if (result.length === 0) {
            return res.json({
                success: 0,
                message: 'No reviews found for this user',
            });
        } else {
            return res.json({
                success: 1,
                reviews: reviews,
            });
        }
    });
});

module.exports = router;
