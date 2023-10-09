const express = require('express');
const app =  express();
const path = require('path');
const cors = require('cors');
const PORT = 8080;

app.use( express.json() );

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

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

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
);