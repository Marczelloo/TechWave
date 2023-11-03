const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.post('/', (req, res) => {
    const userId = req.body.id;
    const newEmail = req.body.email;
    const queryEmail = "SELECT mail form users WHERE id = ?";
    const queryUpdate = "UPDATE users SET mail = ? WHERE id = ?";

    con.query(queryEmail, [userId], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error' 
            });
    
        }
        else
        {
            const emails = result;

            if(emails.length <= 0)
            {
                con.query(queryUpdate, [newEmail, userId], function(err, result) {
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
            }
            else
            {
                res.status(200).send({
                    success: 0,
                    inUse: 1,
                    info: 'Email already exists'
                })
            }
        }
    })

    
})

module.exports = router;