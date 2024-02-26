import '../../style/Dashboard/DashboardOrdersCard.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchProducts = productId?.map(async (idCart: number) => {
        const response = await fetch(`http://localhost:8080/products/${idCart}`, {
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


  const handleOrderClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    navigate(`/dashboard/orders/${orderId}`, { state: { orderId: orderId } });
  }
  return (
    <div className='orders-card-container' onClick={(e) => handleOrderClick(e)}>
        <div className='orders-card-info'>
            <p> {orderStatus} </p>
            <p> {orderDate?.toDateString()} </p>
            <p> nr {orderId} </p>
            <p> {orderPrice} $</p>
        </div>
        <div className='orders-card-products'>
          {
            product?.map((product) => {
              return (
                <img src={product.image} alt='product' />
              )
            })
          }
        </div>
    </div>
  )
}

export default DashboardOrdersCard