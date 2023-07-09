const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.get('/:id', (req, res) =>{

    
    
    const product = [
        { id: 1, name: 'Product 1', image: '/images/product1.png'},
    ];

    res.send({product});
})

module.exports = router;