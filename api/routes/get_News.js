const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT header, content from news where id = ${id}`;

    con.query(query, function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send("Internal Server Error");
        }
        else
        {
            const news = result[0];
            const image = `http://localhost:8080/images/news/${id}/image1.png`;

            const response = {
                header: news.header,
                content: news.content,
                image: image
            }

            console.log(response);

            res.send(response);
        }
    })
})

module.exports = router;