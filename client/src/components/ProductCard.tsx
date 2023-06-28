import React from 'react'
import '../style/ProductCard.css';
import img from '../assets/default_image.webp';
import addToCart from '../assets/addCart.png';
import addToList from '../assets/addList.png';
import { Link } from 'react-router-dom';

type Props = {
    id?: number;
    name: string,
    price: number;
}

function ProductCard({id, name, price}: Props) {
        //with context set id of product then in product page it will get tha data from it
    return (
    <Link to='./Product' className='ProductCard'>
       
        <h1> {name} </h1>
        <img src={img} alt='product-main-image'></img>
        <p> {price} zł </p>
        <div className='BtnContainer'>
            <button className='AddToListBtn'>
                <img src={addToList} alt="dodaj do list"></img>
            </button>
            <button className='AddToCartBtn'>
                <img src={addToCart} alt='dodaj do koszyka'></img>
            </button>
        </div>
        
    </Link>
  )
}

export default ProductCard