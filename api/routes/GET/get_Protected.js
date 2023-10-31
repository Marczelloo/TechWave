const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser'); // Import cookie-parser

router.use(cookieParser());

const SECRET_KEY = '420269742';

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    const authToken = req.cookies.authToken;

    if(authToken === null || authToken === undefined)
    {
        return res.send({
            success: 0,
            info: 'Token not found'
        })
    }
    else
    {
        try {
            const decoded = jwt.verify(authToken, SECRET_KEY);
            if (decoded.exp * 1000 < Date.now()) {
                // Token is expired
                return res.send({
                    success: 0,
                    info: 'Token expired'
                });
            }
            
    
            res.send({
                success: 1,
                info:'Protected Content',
                userId: decoded.userId,
            });
            
        } catch (err) {
            res.status(401).send({
                success: 0,
                info: 'Unauthorized'
            });
        }
    }

    
})

module.exports = router;
