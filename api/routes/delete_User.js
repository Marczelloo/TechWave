const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.delete('/', (req, res) => {
    const userId = req.body.id;
    const password = req.body.password;
    const query1 = "SELECT password FROM users WHERE id = ?";
    const query2 = "DELETE FROM users WHERE id = ?";

    con.query(query1, [userId], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            if(result.length <= 0)
            {
                res.status(404).send({
                    success: 0,
                    info: 'user not found, try again later!'
                })
            }
            
            const user = result[0];

            if(user.password != password)
            {
                res.status(401).send({
                    success: 0,
                    info: 'Wrong password!'
                })
            }
            else
            {
                con.query(query2, [userId], function(err, result) {
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
                            info: 'User succesfully deleted'
                        })
                    }
                })
            }
        }
    })
})

module.exports = router;