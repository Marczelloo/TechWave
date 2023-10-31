const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT username, icon FROM users WHERE id = ?`;

    con.query(query, [id], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            const user = result[0];
            
            res.status(200).send({
                username: user.username,
                icon: user.icon,
            })
        }
    })
})

module.exports = router;