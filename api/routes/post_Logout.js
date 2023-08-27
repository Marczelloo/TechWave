const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    res.clearCookie('authToken');
    res.clearCookie('refreshToken');
    res.send({ success: true});
})

module.exports = router;