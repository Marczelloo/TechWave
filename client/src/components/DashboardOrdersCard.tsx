import '../style/DashboardOrdersCard.css';

import { useState } from 'react';

type Props = {

}

interface Products {

}

function DashboardOrdersCard({}: Props) {
    const [orderStatus, setOrderSatus] = useState<string>();
    const [orderId, setOrderId] = useState<number>();
    const [orderPrice, setOrderPrice] = useState<number>();
    const [orderDate, setOrderDate] = useState<Date>();

    const [products, setProducts] = useState<Products>();

  return (
    <div className='orders-card-contaiener'>
        <div className='orders-card-info'>
            <p> {orderStatus} </p>
            <p> {orderDate?.toDateString()} </p>
            <p> {orderId} </p>
            <p> {orderPrice} </p>
        </div>
        <div className='orders-card-products'>

        </div>
    </div>
  )
}

export default DashboardOrdersCard