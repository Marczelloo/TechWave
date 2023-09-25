import '../style/DashboardCartCard.css';

import trashcan from '../assets/trash.png';
import list from '../assets/addList.png';
import cart from '../assets/addCart.png';

type Props = {
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number,
    handleOnChange: (prodId: number, event: any) => void,
    handleAddToList: (prodId: number) => void,
    handleRemove: (prodId: number) => void,
    cartCard?: boolean,
}

function DashboardCartCard({ id, name, price, image, quantity, handleOnChange, handleAddToList, handleRemove, cartCard}: Props) {
  return (
    <div className='dashboard-cart-card-container'>
        <img src={image} alt='cart product'/>
        <div className='cart-card-info'>
            <p> {name} </p>
            <p> Product id: {id} </p>
        </div>
        <div className='cart-card-price'> <p> {price} $</p></div>
        
        <div className='cart-card-buttons'>
            <select className='cart-card-quantity' name="quantity" id="quantity" value={quantity} onChange={(event) => handleOnChange(id, event.target.value)}>
                <option value={1}> 1 </option>
                <option value={2}> 2 </option>
                <option value={3}> 3 </option>
                <option value={4}> 4 </option>
                <option value={5}> 5 </option>
                <option value={10}> 10 </option>
            </select>
            <button onClick={() => handleAddToList(id)} > <img src={cartCard ? list : cart} alt={cartCard ? "add to list button icon" : "add to cart button icon"}/> </button>
            <button onClick={() => handleRemove(id)}> <img src={trashcan} alt='delete from cart button icon'/></button>
        </div>
    </div>
  )
}

export default DashboardCartCard