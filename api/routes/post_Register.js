const express = require('express'); 
const router = express.Router();
const con = require('../db.js');
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
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;

    const query = `SELECT mail from users WHERE mail = "${email}"`;
    
    con.query(query, function(err, result) {
        if(err)
        {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
        else
        {
            if(result.length === 0)
            {
                const icon = "http://localhost:8080/images/users/default_avatar.png";
                const insert = `INSERT INTO users(mail, username, password, icon) VALUES("${email}", "${username}", "${password}", "${icon}")`;

                con.query(insert, function(err, result) {
                    if(err)
                    {
                        console.error(err);
                        res.status(500).send('Internal Server Error');
                    }
                    else
                    {
                        const userData = {email: email, username: username};

                        const expiresIn = rememberMe === 'true' ? ms('30d') : ms('1h');
                        const authToken = generateAuthToken(userData, expiresIn);
                        const refreshToken = generateRefreshToken();

                        res.cookie('authToken', authToken, {httpOnly: true, maxAge: expiresIn});
                        res.cookie('refreshToken', refreshToken, {httpOnly: true, maxAge: ms('90d')});

                        res.send({
                            success: 1,
                            info: 'user succesfully added',
                        })
                    }
                })
            }
            else 
            {   
                res.send({
                    success: 0,
                    info: 'email already in use'
                })
            }
        }
    })
})

module.exports = router;