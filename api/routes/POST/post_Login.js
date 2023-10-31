const express = require('express');
const router = express.Router();
const con = require('../../db.js');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const ms = require('ms');

router.use(cookieParser()); 

const SECRET_KEY = '420269742';

function generateAuthToken(userData, expiresIn) {
    return jwt.sign(userData, SECRET_KEY, { expiresIn });
}

function generateRefreshToken() {
    return jwt.sign({ type: 'refresh' }, SECRET_KEY, { expiresIn: '30d' });
}
  

router.post('/', (req, res) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const login = req.body.login;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;

    let query;
    
    if(emailPattern.test(login))
    {
        query = `SELECT id, mail, password from users WHERE mail = '${login}'`;
    }
    else 
    {
        query = `SELECT id, username, password from users WHERE username = '${login}'`;
    }

    con.query(query, function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send({
                success: 0,
                info: 'Internal Server Error'
            });
        }
        else
        {
            if(result.length === 0)
            {
                res.send({
                    success: 0,
                    info: 'Invalid email or username',
                });
            }
            else
            {
                const q_result = result[0];
                if(password === q_result.password)
                {
                    const userData = { userId: q_result.id, username: q_result.username };

                    const expiresIn = rememberMe === true ? ms('30d') : ms('1h');                    
                    const authToken = generateAuthToken(userData, expiresIn);
                    const refreshToken = generateRefreshToken();

                     // Send tokens as cookies
                    res.cookie('authToken', authToken, { httpOnly: true, maxAge: expiresIn });
                    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: ms('90d') });
                    
                    res.status(200).send({
                        success: 1,
                        info: 'login successful',
                    });
                }
                else
                {
                    res.send({
                        success: 0,
                        info: 'Wrong password',
                    });
                }
            }
        }
    });
});

module.exports = router;
