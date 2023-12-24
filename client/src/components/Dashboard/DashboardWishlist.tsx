import WishlistCard from './DashboardCartCard';
import CartOrderProduct from './DashboardCartOrder';

import '../../style/Dashboard/DashboardWishlist.css';

import { useState, useEffect } from 'react';

import { usePopup } from '../Popup/PopupProvider';


type Props = {
  setReloadNavbar: (reload: boolean) => void,
}

type Wishlist = {
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number
}

type idWishlist = {
  id_product: number,
  quantity: number,
  map: any,
  filter: any,
  length: any,
}

function DashboardWishlist({setReloadNavbar}: Props) {
  const { showPopup } = usePopup();

  const [wishlistId, setWishlistId] = useState<idWishlist>();
  const [wishlist, setWishlist] = useState<Wishlist[] | undefined>(undefined);
  const [sumPrice, setSumPrice] = useState<number>(0);

  useEffect(() => {
    const getWishlistId = () => {
      const wishlist = localStorage.getItem('wishlist');
      const parsedWishlist: idWishlist = wishlist ? JSON.parse(wishlist) : [];

      setWishlistId(parsedWishlist);
    }

    getWishlistId();
  }, [])

  useEffect(() => {
    const calcSummPrice = () => {
      let sumPrice = 0;
      wishlist?.forEach(element => {
        sumPrice += element.price * element.quantity;
        sumPrice = parseFloat(sumPrice.toFixed(2));
      })

      setSumPrice(sumPrice);
    }

    calcSummPrice();
  }, [wishlist])

  useEffect(() => {
    const updateLocalStorage = () => {
      localStorage.setItem('wishlist', JSON.stringify(wishlistId));

    }

    const fetchData = async () => {
      if(wishlistId?.length === 0) return;

      try {
        const fetchPromises = wishlistId?.map(async (wishlist: idWishlist) => {
          const response = await fetch(`http://localhost:8080/products/${wishlist.id_product}`, {
            method: 'GET',
          });

          if(!response.ok) 
          {
            throw new Error('Request failed');
          }

          const data =  await response.json();

          const fetchedWishlist: Wishlist = {
            id: data.id, 
            name: data.name,
            price: data.price,
            image: data.images[0],
            quantity: wishlist.quantity,
          };

          return fetchedWishlist;
        });

        const wishlistData = await Promise.all(fetchPromises);

        setWishlist((prev) => {
          const prevArray = prev || [];
          const updateWishlist = [...prevArray, ...wishlistData].reduce((acc, current) => {
            const existingItem = acc.find((item: { id: number }) => item.id === current.id);
            if(!existingItem) 
            {
              acc.push(current);
            }

            return acc;
          }, []);

          return updateWishlist;
        });

        updateLocalStorage();
      } 
      catch(error)
      {
        console.error(error);
      }
    };

    fetchData();
  }, [wishlistId])

  const wishlistHandleQuantityChange = (prodId: number, newQuantity: number) => {
    setWishlist((prev) =>
      prev?.map((product) => product.id === prodId ? {...product, quantity: newQuantity} : product)
    )

    setWishlistId((prev) =>
      prev?.map((product: any) => product.id_product === prodId ? {...product, quantity: newQuantity} : product)
    )
  }

  const handleAddToCart = (prodId: number) => {
    const addToCart = (id: number, quantity: number) => {
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
            updatedCart[existingProductIndex].quantity = Number(quantity);
          } 
          else 
          {
            updatedCart = [...existingCart, { id_product: id, quantity: quantity }];
          }
        }
      
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        showPopup('Product successfully added to cart!');

        setReloadNavbar(true)
      }

    wishlist?.map((product) => {
      product.id === prodId && addToCart(product.id, product.quantity);
    })
  }

  const handleRemove = (prodId: number) => {
    setWishlist((prev) => prev?.filter((product) => product.id !== prodId));
    setWishlistId((prev) => prev?.filter((product: { id_product: number}) => product.id_product !== prodId));
    localStorage.setItem('wishlist', JSON.stringify(wishlistId?.filter((product: { id_product: number}) => product.id_product !== prodId)));

    showPopup('Products successfully removed from wishlist!');
    setReloadNavbar(true); 
  }
  
  const handleAddAllCart = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    localStorage.setItem('cart', JSON.stringify(wishlistId));

    showPopup('Products successfully added to cart!');
    setReloadNavbar(true);
  }

  return (
    <div className='dashboard-wishlist-container'>
      <h2> Wishlist </h2>
      {
        (wishlist === undefined || wishlist.length === 0) && <p className='empty-cart'> Your cart is empty! </p>
      }
      <div className='dashboard-wishlist-content'>
        <div className='wishlist-container'>
          {
            wishlist !== undefined && wishlist.length > 0 &&
            (
              wishlist.map((elem) => {
              return <WishlistCard
              key={"wishlist card" + elem.id + " " + elem.name}
              id={elem.id}
              name={elem.name}
              price={elem.price}
              image={elem.image}
              quantity={elem.quantity}
              handleOnChange={wishlistHandleQuantityChange}
              handleAddToList={handleAddToCart}
              handleRemove={handleRemove}
              />
            }))
          }
        </div>
        {
          wishlist !== undefined && wishlist.length > 0 &&
          (
            <div className='wishlist-order-container'>
              {
                wishlist.map((elem) => (
                  <CartOrderProduct key={'Cart-order-product ' + elem.name + ' ' + elem.id} name={elem.name} quantity={elem.quantity} price={elem.price} />
                ))}
                <h4> Total price: { sumPrice} $</h4>
                <div className='wishlist-add-cart-button-container'>
                  <button onClick={(e) => handleAddAllCart(e)}> Add all products to cart! </button>
                </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default DashboardWishlist