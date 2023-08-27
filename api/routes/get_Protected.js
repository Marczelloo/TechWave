const express = require('express');
const router = express.Router();

const SECRET_KEY = '420269742';

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const authToken = req.cookies.authToken;

    try {
        const decoded = jwt.verify(authToken, SECRET_KEY);
        console.log('UserID: ', decoded.userId);
        console.log('UserName: ', decoded.username);

        res.send('Protected Content');
    } catch (err) {
        res.status(401).send('Unauthorized');
    }
})

module.exports = router;
