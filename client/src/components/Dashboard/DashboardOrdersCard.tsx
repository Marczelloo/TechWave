import '../../style/Dashboard/DashboardOrdersCard.css';

import { useEffect, useState } from 'react';

type Props = {
orderStatus: string,
orderId: number,
orderPrice: number,
orderDate: Date,
productId: number[],
}

type Products = {
  id: number,
  image: string,
}

function DashboardOrdersCard({ orderId, orderPrice, orderDate, orderStatus, productId }: Props) {
  const [product, setProduct] = useState<Products[]>();

  useEffect(() => {
    try {
      const fetchProducts = productId?.map(async (idCart: number) => {
        const response = await fetch(`http://localhost:8080/get_Product/${idCart}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        const fetchedProduct: Products = {
          id: data.id,
          image: data.images[0],
        }

        return fetchedProduct;      
      });

      Promise.all(fetchProducts)
      .then((data) => {
        setProduct(data);
      })

    }
    catch(error)
    {
      console.log(error);
    }

  }, [])


  return (
    <div className='orders-card-contaiener'>
        <div className='orders-card-info'>
            <p> {orderStatus} </p>
            <p> {orderDate?.toDateString()} </p>
            <p> {orderId} </p>
            <p> {orderPrice} </p>
        </div>
        <div className='orders-card-products'>
          {
            product?.map((product) => {
              return (
                <div className='orders-card-product'>
                  <img src={product.image} alt='product' />
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default DashboardOrdersCard