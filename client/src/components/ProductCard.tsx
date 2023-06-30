import '../style/ProductCard.css';
import img from '../assets/default_image.webp';
import addToCart from '../assets/addCart.png';
import addToList from '../assets/addList.png';
import { Link } from 'react-router-dom';

type Props = {
    id?: number,
    name: string,
    price: number,
    sale?: boolean,
}

function ProductCard({id, name, price, sale}: Props) {

    const handleAddToCart = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("Add to cart");
        console.log(id);
    }
        //with context set id of product then in product page it will get tha data from it
    return (
    <Link to='./Product' className='ProductCard'>
       
        <h1> {name} </h1>
        <img src={img} alt='product-main-image'></img>
        { sale == true ? <p> <span className="discount"> {price} zl </span> &nbsp; {price} zl </p> :  <p> {price} zł </p>}
        <div className='BtnContainer'>
            <button onClick={handleAddToCart} className='AddToListBtn'>
                <img src={addToList} alt="dodaj do list"></img>
            </button>
            <button onClick={handleAddToCart} className='AddToCartBtn'>
                <img src={addToCart} alt='dodaj do koszyka'></img>
            </button>
        </div>
        
    </Link>
  )
}

export default ProductCard