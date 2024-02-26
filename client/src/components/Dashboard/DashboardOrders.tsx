import '../../style/Dashboard/DashboardOrders.css';
import OrdersCard from './DashboardOrdersCard';

import { useState, useEffect } from 'react';

type Props = {

}

type Orders = {
  status: string,
  id: number,
  price: number,
  date: Date,
  products: number[],
}

function DashboardOrders({}: Props) {
    const [userId, setUserId] = useState<number>(0);
    const [orders, setOrders] = useState<Orders[] | null>([{status: 'Delivered', id: 1, price: 100, date: new Date(), products: [1, 1, 1]}]);
    
    useEffect(() => {
        fetchOrders();
    }, [orders])

    const fetchOrders = async () => {
        try {
          const response = await fetch('http://localhost:8080/protected',{
            method: 'GET',
            credentials: 'include'
            });

            if(!response.ok)
            {
              throw new Error('Request failed');
            }

            const data = await response.json();

            setUserId(data.userId);
        }
        catch(error)
        {
            console.error(error);
        }

        try {
          const response = await fetch(`http://localhost:8080/get_orders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
         });

          if (!response.ok) {
            throw new Error("Request failed");
          }

          const data = await response.json();

          const fetchedOrders: Orders[] = data.map((order: any) => {
            const fetchedOrder: Orders = {
                status: order.status,
                id: order.id,
                price: order.total_price,
                date: order.date,
                products: JSON.parse(order.products_id.products)
            }

            return fetchedOrder;
          })
            setOrders(fetchedOrders);
          }
          catch(error)
          {
            console.error(error);
          }
    }

  return (
    <div className='dashboard-orders-container'>
        <h2> Orders </h2>
        {
          orders?.length === 0 ? <p> You don't have any orders yet </p> : null
        }
        <div className='orders-container'>
          {
            orders?.map((order) => {
                return <OrdersCard
                key={order.id + " " + order.date}
                orderStatus={order.status}
                orderId={order.id}
                orderPrice={order.price}
                orderDate={order.date}
                productId={order.products}
                />
            })
          }
        </div>
    </div>
  )
}

export default DashboardOrders