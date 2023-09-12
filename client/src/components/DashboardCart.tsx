import '../style/DashboardCart.css';

import CartCard from './DashboardCartCard';
import CartOrderProduct from './DashboardCartOrder';

import { useState, useEffect } from 'react';

type Props = {}

interface Cart {
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number,
}

function DashboardCart({}: Props) {
    const test = [{id: 1, name: "test", price: 1599, image: "http://localhost:8080/images/products/1/image1.png", quantity: 1 },
    {id: 2, name: "produkt", price: 456, image: "http://localhost:8080/images/products/1/image1.png", quantity: 2 },
    {id: 3, name: "test", price: 1599, image: "http://localhost:8080/images/products/1/image1.png", quantity: 3 },
    {id: 4, name: "test", price: 1599, image: "http://localhost:8080/images/products/1/image1.png", quantity: 1 },
    {id: 5, name: "test", price: 1599, image: "http://localhost:8080/images/products/1/image1.png", quantity: 5 }]
  
    const [cartId, setCartId] = useState<number[]>([]);
    const [cart, setCart] = useState<Cart[] | undefined>(test);
    const [summPrice, setSummPrice] = useState<number>(0);

    useEffect(() => {
        const calcSummPrice = () => {
            let summPrice = 0;
            cart?.forEach(element => {
                summPrice += element.price;
            });
            
            setSummPrice(summPrice);
        }

        const fetchData = () => {
            console.log(cart);
        }
        
        calcSummPrice();
        fetchData();
    }, [cart])

    const cartHandleQuantityChange = (prodId: number, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart?.map((product) => product.id === prodId ? {...product, quantity:newQuantity } : product)
        )
    }

    const handleAddToList = (prodId: number) => {
        const addToList = () => {
            console.log("Add to list, prodId", prodId);
        }
        cart?.map((product) => {
            product.id === prodId && addToList  
        })
    }

    const handleRemove = (prodId: number) => {
        setCart((prevCart) => prevCart?.filter((product) => product.id !== prodId))
    }
    
  return (
    <div className='dashboard-cart-container'>
        <h2> Cart </h2>
        {
            cart === undefined || cart.length === 0 && <p className='empty-cart'> Your cart is empty! </p>
        }
        <div className='dashboard-cart-content'>
            <div className='cart-container'>
            {
                cart !== undefined && cart.length > 0 && 
                ( cart.map((elem) => {
                    return <CartCard 
                    key={"cart card" + elem.id + " " + elem.name}
                    id={elem.id}
                    name={elem.name}
                    price={elem.price}
                    image={elem.image} 
                    quantity={elem.quantity} 
                    handleOnChange={cartHandleQuantityChange}
                    handleAddToList={handleAddToList}
                    handleRemove={handleRemove}/>
                })) 
            }
            </div>
            {
                cart !== undefined && cart.length > 0 && (
                    <div className='cart-order-container'>
                        <h2> Cart total </h2>
                        {cart.map((elem) => (
                            <CartOrderProduct name={elem.name} quantity={elem.quantity} price={elem.price} />
                        ))}
                        <h4> Total price: {summPrice} $</h4>
                        <div className='cart-order-button-container'>
                            <button> Procced to Shipping</button>
                        </div>
                    </div>
                )
            }
            
        </div> 
    </div>
  )
}

export default DashboardCart