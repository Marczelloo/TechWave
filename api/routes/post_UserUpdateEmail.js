const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.post('/', (req, res) => {
    const userId = req.body.id;
    const newEmail = req.body.newEmail;
    const query = "UPDATE users SET mail = ? WHERE id = ?";

    con.query(query, [newEmail, userId], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error' });
        }
        else
        {
            res.status(200).send({
                success: 1,
                info: 'Email succesfully updated'
            })
        }
    })
})

module.exports = router;