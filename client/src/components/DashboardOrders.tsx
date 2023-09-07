import '../style/DashboardOrders.css';
import OrdersCard from '../components/DashboardOrdersCard';

import { useState } from 'react';

type Props = {

}

interface Orders {
    
}

function DashboardOrders({}: Props) {
    const [orders, setOrders] = useState<Orders[] | null>(null);
    const fetchOrders = () => {

    }

  return (
    <div className='dashboard-orders-container'>
        <h2> Orders </h2>
        <div className='orders-container'>
            <OrdersCard/>
        </div>
    </div>
  )
}

export default DashboardOrders