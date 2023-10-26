const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.post('/', (req, res) => {
    const userId = req.body.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const query1 = "SELECT password from users WHERE id = ?";
    const query2 = "UPDATE users SET password = ? WHERE id = ?";

    con.query(query1, [userId], function(err, result) {
        if (err) {
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error'
            });
        } else {
            if (result.length <= 0) {
                res.status(200).send({
                    success: 0,
                    info: 'User not found, try again later!'
                });
            } else {
                const user = result[0];
                if (user.password !== oldPassword) {
                    res.status(200).send({
                        success: 0,
                        info: 'Wrong old password!'
                    });
                } else {
                    con.query(query2, [newPassword, userId], function(err, result) {
                        if (err) {
                            console.error(err);
                            res.status(500).send({
                                success: 0,
                                info: 'Internal Server Error'
                            });
                        } else {
                            res.status(200).send({
                                success: 1,
                                info: 'Password successfully updated'
                            });
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;
