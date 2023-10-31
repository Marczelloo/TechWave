const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.get('/', (req, res) => {
    const query = `SELECT id, header, description from news`;

    con.query(query, function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            console.log(result);

            const news = result.map(data => {
                console.log(data);
                const image = `http://localhost:8080/images/news/${data.id}/image1.png`;

                return {
                    id: data.id,
                    header: data.header,
                    description: data.description,
                    image: image
                }
            });

            console.log(news);

            res.send({
                news
            })
        }
    })
})

module.exports = router;