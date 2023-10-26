const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.post('/', (req, res) => {
    const userId = req.body.id;
    const newUsername = req.body.newUsername;
    const query = "UPDATE users SET username = ? WHERE id = ?";

    con.query(query, [newUsername, userId], function(err, result) {
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
                info: 'Username succesfully updated'
            })
        }
    })
})

module.exports = router;