const express = require('express');
const router = express.Router();
const con = require('../db.js');

router.get('/', async (req, res) => {
  try {
    const query = `SELECT id_Product from recommended LIMIT 10`;
    const result = await executeQuery(query);

    const productIds = result.map(item => item.id_Product);
    const productPromises = productIds.map(productId => {
      const query = `SELECT id, name, image_count, short_spec from products where id = ${productId}`;
      return executeQuery(query);
    });

    const productDataList = await Promise.all(productPromises);
    console.log(productDataList);
    const product_list = productDataList.map(data => {
      const imgCount = data[0].image_count;
      const images = [];

      for (let i = 0; i < imgCount; i++) {
        images.push(`http://localhost:8080/images/${data[0].id}/image${i + 1}.png`);
      }

      return {
        id: data[0].id,
        name: data[0].name,
        short_spec: data[0].short_spec,
        images: images,
      };
    });

    console.log("List:", product_list);

    const response = {
      product_list: product_list,
      message: "Success",
    };

    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    con.query(query, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = router;
