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

const get_Product = require('./routes/GET/get_Product.js');
const get_Recommended = require('./routes/GET/get_Recommended.js');
const get_Hotdeals = require('./routes/GET/get_HotDeals.js');
const get_NewsCard = require('./routes/GET/get_NewsCards.js');
const get_News = require('./routes/GET/get_News.js');
const post_Login = require('./routes/POST/post_Login.js');
const get_Protected = require('./routes/GET/get_Protected.js');
const post_Register = require('./routes/POST/post_Register.js');
const get_User = require('./routes/GET/get_User.js');
const get_Reviews = require('./routes/GET/get_Reviews.js');
const post_Review = require('./routes/POST/post_Review.js');
const get_UserReviews = require('./routes/GET/get_UserReviews.js');
const delete_Review = require('./routes/DELETE/delete_review.js');
const update_Review = require('./routes/UPDATE/update_EditReview.js');
const get_UserInfo = require('./routes/GET/get_UserInfo.js');
const post_UserUpdateEmail = require('./routes/UPDATE/update_UserUpdateEmail.js');
const post_UserUpdatePassword = require('./routes/UPDATE/update_UserUpdatePassword.js');
const post_UserUpdateUsername = require('./routes/UPDATE/update_UserUpdateUsername.js');
const delete_User = require('./routes/DELETE/delete_User.js');
const put_UserIcon = require('./routes/PUT/put_UserIcon.js');
const get_ProductByName = require('./routes/GET/get_ProductByName.js');
const get_SearchProducts = require('./routes/GET/get_SearchProducts.js');
const get_ProductsByIds = require('./routes/GET/get_ProductsByIds.js');
const get_Logout = require('./routes/GET/get_Logout.js');


app.use('/products', get_Product);
app.use('/recommended', get_Recommended);
app.use('/hotdeals', get_Hotdeals);
app.use('/newscards', get_NewsCard);
app.use('/news', get_News);
app.use('/login', post_Login);
app.use('/protected', get_Protected);
app.use('/register', post_Register);
app.use('/user', get_User);
app.use('/reviews', get_Reviews);
app.use('/post_review', post_Review)
app.use('/userReviews', get_UserReviews);
app.use('/delete_review', delete_Review);
app.use('/edit_review', update_Review);
app.use('/get_userInfo', get_UserInfo);
app.use('/post_userUpdateEmail', post_UserUpdateEmail);
app.use('/post_userUpdatePassword', post_UserUpdatePassword);
app.use('/post_userUpdateUsername', post_UserUpdateUsername);
app.use('/delete_user', delete_User);
app.use('/put_userIcon', put_UserIcon);
app.use('/get_productByName', get_ProductByName);
app.use('/get_searchProducts', get_SearchProducts);
app.use('/get_productsByIds', get_ProductsByIds);
app.use('/get_logout', get_Logout);


app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
);