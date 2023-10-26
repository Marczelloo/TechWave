const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT username, mail, password, icon FROM users WHERE id = ?';

    con.query(query, [userId], function(err, result) {
        if(err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else if(result.length === 0) {
            res.status(404).send({
                success: 0,
                info: 'user not found, try again later!'
            });
        } else {
            const user = result[0];
            const { username, mail, password, icon } = user;

            res.status(200).send({
                success: 1,
                username: username || '',
                email: mail || '',
                password: password || '',
                icon: icon || '',
            });
        }
    });
});

module.exports = router;
