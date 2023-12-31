const express = require('express');
const router = express.Router();
const con = require('../../db.js');

router.get('/:id', (req, res) => {
  const query = `SELECT id, name, price, sale_price, image_count, description, specification from products where id = ${req.params.id}`;

  con.query(query, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const product = result[0]; // Assuming the query returns a single row

      const getImagePath = () => {
        let img_arr = [];
        for(i = 0; i < product.image_count; i++) {
            img_arr.push(`http://localhost:8080/images/products/${product.id}/image${i + 1}.png`)
        }

        return img_arr;
      }

      const images = getImagePath();

      res.send({
        id: product.id,
        name: product.name,
        price: product.price,
        sale_price: product.sale_price,
        images: images,
        description: product.description,
        specification: product.specification,
      });
    }
  });
});

module.exports = router;
