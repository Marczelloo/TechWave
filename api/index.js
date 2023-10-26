const express = require('express');
const app =  express();
const path = require('path');
const cors = require('cors');
const PORT = 8080;

app.use( express.json() );

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

const product = require('./routes/get_Product.js');
const recommended = require('./routes/get_Recommended.js');
const hotdeals = require('./routes/get_HotDeals.js');
const news_card = require('./routes/get_NewsCards.js');
const news = require('./routes/get_News.js');
const login = require('./routes/post_Login.js');
const logout = require('./routes/post_Logout.js');
const protected = require('./routes/get_Protected.js');
const register = require('./routes/post_Register.js');
const user = require('./routes/get_User.js');
const reviews = require('./routes/get_Reviews.js');
const post_review = require('./routes/post_Review.js');
const userReviews = require('./routes/get_UserReviews.js');
const delete_review = require('./routes/delete_review.js');
const edit_review = require('./routes/post_EditReview.js');
const get_userInfo = require('./routes/get_UserInfo.js');
const post_UserUpdateEmail = require('./routes/post_UserUpdateEmail.js');
const post_UserUpdatePassword = require('./routes/post_UserUpdatePassword.js');
const post_UserUpdateUsername = require('./routes/post_UserUpdateUsername.js');
const delete_User = require('./routes/delete_User.js');
const put_UserIcon = require('./routes/put_UserIcon.js');

app.use('/products', product);
app.use('/recommended', recommended);
app.use('/hotdeals', hotdeals);
app.use('/newscards', news_card);
app.use('/news', news);
app.use('/login', login);
app.use('/logout', logout);
app.use('/protected', protected);
app.use('/register', register);
app.use('/user', user);
app.use('/reviews', reviews);
app.use('/post_review', post_review)
app.use('/userReviews', userReviews);
app.use('/delete_review', delete_review);
app.use('/edit_review', edit_review);
app.use('/get_userInfo', get_userInfo);
app.use('/post_userUpdateEmail', post_UserUpdateEmail);
app.use('/post_userUpdatePassword', post_UserUpdatePassword);
app.use('/post_userUpdateUsername', post_UserUpdateUsername);
app.use('/delete_user', delete_User);
app.use('/put_UserIcon', put_UserIcon);

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
);