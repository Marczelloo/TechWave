const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.status(200).send({
        tshirt: 'shirt', //
        size: 'large'
    })
});

module.exports = router;