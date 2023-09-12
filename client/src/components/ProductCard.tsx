import '../style/ProductCard.css';
import addToCart from '../assets/addCart.png';
import addToList from '../assets/addList.png';
import { Link } from 'react-router-dom';

import { usePopup } from './PopupProvider';

type Props = {
    id: number,
    name: string,
    price: number,
    image: string,
    sale?: boolean,
    new_price?: number,
}

function ProductCard({id, name, image, price, sale, new_price}: Props) {
    const { showPopup } = usePopup();

    const quantity = 1;


    const handleAddToWishlist = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    const existingWishlistString = localStorage.getItem('wishlist');
    const existingWishlist = existingWishlistString ? JSON.parse(existingWishlistString) : [];

    let updatedWishlist = [];

    if(existingWishlist.length <= 0) 
    {
      updatedWishlist = [{ id_product: id, quantity: quantity}];
    }
    else
    {
      const existingProduct = existingWishlist.filter((product: { id_product: number}) => product.id_product === id);
      const existingProductIndex = existingWishlist.findIndex((product: { id_product: number; }) => product.id_product === id);

      if(existingProduct.length > 0 && existingProduct[0].id_product === id)
      {
        updatedWishlist = [...existingWishlist];
        updatedWishlist[existingProductIndex].quantity += quantity;
      } 
      else
      {
        updatedWishlist = [...existingWishlist, { id_product: id, quantity: quantity}];
      }
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    showPopup('Product successfully added to wishlist!');
    }

    const handleAddToCart = (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        const existingCartString = localStorage.getItem('cart');
        const existingCart = existingCartString ? JSON.parse(existingCartString) : [];
      
        let updatedCart = [];
      
        if (existingCart.length <= 0) 
        {
          updatedCart = [{ id_product: id, quantity: quantity }];
        } 
        else 
        {
          const existingProduct = existingCart.filter((product: { id_product: number; }) => product.id_product === id);
          const existingProductIndex = existingCart.findIndex((product: { id_product: number; }) => product.id_product === id);
      
          console.log('Existing product', existingProduct);
      
          if (existingProduct.length > 0 && existingProduct[0].id_product === id) 
          {
            console.log('Product already exists in the cart.');
      
            updatedCart = [...existingCart];
            updatedCart[existingProductIndex].quantity += quantity;
          } 
          else 
          {
            updatedCart = [...existingCart, { id_product: id, quantity: quantity }];
          }
        }
      
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        showPopup('Product successfully added to cart!');
      }
        //with context set id of product then in product page it will get tha data from it
    return (
    <Link to={{ pathname: './Product', search: `product_id=${id}`}} className='ProductCard'>
        <h1> {name} </h1>
        <img src={image} alt='product-main-image'></img>
        { sale == true ? <p> <span className="discount"> {price} zl </span> &nbsp; {new_price} zl </p> :  <p> {price} zł </p>}
        <div className='BtnContainer'>
            <button onClick={(event) => handleAddToWishlist(event)} className='AddToListBtn'>
                <img src={addToList} alt="dodaj do list"></img>
            </button>
            <button onClick={(event) => handleAddToCart(event)} className='AddToCartBtn'>
                <img src={addToCart} alt='dodaj do koszyka'></img>
            </button>
        </div>
        
    </Link>
  )
}

export default ProductCard