import '../style/DashboardCartOrder.css';

type Props = {
    name: string,
    price: number,
    quantity: number,
}

function DashboardCartOrder({name, price, quantity}: Props) {
  return (
    <div className='dashboard-cart-order'>
        <p> {name} x {quantity}</p>
        <p> {price} $</p>
    </div>
  )
}

export default DashboardCartOrder