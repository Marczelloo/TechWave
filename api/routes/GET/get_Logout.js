const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.get('/', (req, res) => {
    res.cookie('authToken', 'none', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    })
    res.cookie('refreshToken', 'none', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    })

    res.status(200).send({
        success: 1,
        info: 'Logged out'
    })
})

module.exports = router;