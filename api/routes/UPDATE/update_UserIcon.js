const  experss = require('express');
const router = experss.Router();
const con = require('../../db.js');

router.update('/', (req, res) => {
    const userId = req.body.id;
    const icon = req.body.icon;
    const query = "UPDATE icon FROM users WHERE id = ?";

    con.query(query, [userId], function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error' });
        }
        else
        {
            res.status(200).send({
                success: 1,
                info: 'Icon succesfully updated'
            })
        }
    })
})