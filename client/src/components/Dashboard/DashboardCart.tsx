import '../../style/Dashboard/DashboardCart.css';

import CartCard from './DashboardCartCard';
import CartOrderProduct from './DashboardCartOrder';

import { useState, useEffect } from 'react';

import { usePopup } from '../Popup/PopupProvider';


type Props = {
  setReloadNavbar: (reload: boolean) => void, // Add this lines
}

interface Cart {
    id: number,
    name: string,
    price: number,
    image: string,
    quantity: number,
}

interface idCart {
    id_product: number,
    quantity: number,
    filter: any,
    length: any,
    map: any,
}

function DashboardCart({ setReloadNavbar }: Props) {  
    const { showPopup } = usePopup();

    const [cartId, setCartId] = useState<idCart>();
    const [cart, setCart] = useState<Cart[]>([]);
    const [summPrice, setSummPrice] = useState<number>(0);

    useEffect(() => {
        const getCartId = () => {
            
            const cart = localStorage.getItem('cart');
            const parsedCart: idCart = cart ? JSON.parse(cart) : [];
            
            setCartId(parsedCart);
         }

         getCartId();
    }, [])

    useEffect(() => {
        const calcSummPrice = () => {
            let sumPrice = 0;
            cart?.forEach(element => {
                sumPrice += element.price * element.quantity
                sumPrice = parseFloat(sumPrice.toFixed(2));
            });
            
            setSummPrice(sumPrice);
        }
        
        calcSummPrice();
    }, [cart])

    

    useEffect(() => {
        const updateLocalStorage = () => {
            localStorage.setItem('cart', JSON.stringify(cartId));
        }
        
        const fetchData = async () => {
          if (cartId?.length === 0) return;
      
          try 
          {
            const fetchPromises = cartId?.map(async (cart: idCart) => {
              const response = await fetch(`http://localhost:8080/products/${cart.id_product}`, {
                method: 'GET',
              });
      
              if (!response.ok) {
                throw new Error('Request failed');
              }
      
              const data = await response.json();
      
              const fetchedCart: Cart = {
                id: data.id,
                name: data.name,
                price: data.price,
                image: data.images[0],
                quantity: cart.quantity,
              };
      
              return fetchedCart;
            });
      
            const cartData = await Promise.all(fetchPromises);
      
            // Filter out duplicates before updating the cart state
            setCart((prev) => {
              const prevArray = prev || [];
              const updatedCart = [...prevArray, ...cartData].reduce((acc, current) => {
                const existingItem = acc.find((item: { id: number}) => item.id === current.id);
                if (!existingItem) {
                  acc.push(current);
                }
                return acc;
              }, []);
              return updatedCart;
            });
      
            updateLocalStorage();
          } 
          catch (error) 
          {
            console.error(error);
          }
        };
      
        fetchData();
      }, [cartId]);
      
    
    const cartHandleQuantityChange = (prodId: number, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart?.map((product) => product.id === prodId ? {...product, quantity:newQuantity } : product)
        )

        setCartId((prevCart) =>
            prevCart?.map((product: { id_product: number; quantity: number }) => product.id_product === prodId ? {...product, quantity:newQuantity } : product)
        )
    }

    const handleAddToList = (prodId: number) => {
      const addToList = (id: number, quantity: number) => {
        const existingWishlistString = localStorage.getItem('wishlist');
        const existingWishlist = existingWishlistString ? JSON.parse(existingWishlistString) : [];
        
        let updatedWishlist = [];

        if (existingWishlist.length <= 0) 
          {
            updatedWishlist = [{ id_product: id, quantity: quantity }];
          } 
          else 
          {
            const existingProduct = existingWishlist.filter((product: { id_product: number; }) => product.id_product === id);
            const existingProductIndex = existingWishlist.findIndex((product: { id_product: number; }) => product.id_product === id);
        
            console.log('Existing product', existingProduct);
        
            if (existingProduct.length > 0 && existingProduct[0].id_product === id) 
            {
              console.log('Product already exists in the cart.');
        
              updatedWishlist = [...existingWishlist];
              updatedWishlist[existingProductIndex].quantity = Number(quantity);
            } 
            else 
            {
              updatedWishlist = [...existingWishlist, { id_product: id, quantity: quantity }];
            }
          }
        
          localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
          showPopup('Product successfully added to wishlist!');

          setReloadNavbar(true);
        }

        cart?.map((product) => {
            product.id === prodId && addToList(product.id, product.quantity);  
        })
    }

    const handleRemove = (prodId: number) => {
        setCart((prevCart) => prevCart?.filter((product) => product.id !== prodId));
        setCartId((prevCart) => prevCart?.filter((product: { id_product: number }) => product.id_product !== prodId));
        localStorage.setItem('cart', JSON.stringify(cartId?.filter((product : {id_product: number}) => product.id_product !== prodId)));

        showPopup('Product successfully removed from cart!');
        setReloadNavbar(true);
    }

  return (
    <div className='dashboard-cart-container'>
        <h2> Cart </h2>
        {
            (cart === undefined || cart.length === 0) && <p className='empty-cart'> Your cart is empty! </p>
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
                    handleRemove={handleRemove}
                    cartCard={true}
                    />
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