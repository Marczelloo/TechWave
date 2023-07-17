const express = require('express');
const app =  express();
const path = require('path');
const cors = require('cors');
const PORT = 8080;

app.use( express.json() );

app.use(cors());

// const tshirtIdRoutes = require('./routes/post.js');
// const tshirtRoutes = require('./routes/get.js')

// app.use('/tshirt', tshirtIdRoutes);
// app.use('/tshirt', tshirtRoutes);

const product = require('./routes/get_Product.js');
const recommended = require('./routes/get_Recommended.js');
const hotdeals = require('./routes/get_HotDeals.js');
const news_card = require('./routes/get_NewsCards.js');
const news = require('./routes/get_News.js');

app.use('/products', product);
app.use('/recommended', recommended);
app.use('/hotdeals', hotdeals);
app.use('/newscards', news_card);
app.use('/news', news);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
);