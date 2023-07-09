const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    
    const product = [
        { id: 1, name: 'Product 1', image: '/images/product1.png'},
    ];

    res.send({product});
})

module.exports = router;