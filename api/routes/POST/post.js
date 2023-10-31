const express = require('express');
const router = express.Router();

router.post('/:id', (req, res) =>{
    const { id } = req.params;
    const { logo } = req.body;

    if(!logo) {
        res.status(418).send({ message: 'We need a logo!'})
    }

    res.send({
        tshirt: `shirt with you ${logo} and ID of ${id}`,
    });
})

module.exports = router;