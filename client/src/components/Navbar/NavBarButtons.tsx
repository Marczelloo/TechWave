import NavBtn from './NavBtn';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';

import '../../style/Navbar/NavBarButtons.css';

import account_img from '../../assets/account.png';
import cart_img from '../../assets/cart.png';
import list_img from '../../assets/list.png';

import NotifcationCount from './NavBarNotiCount';

function NavBarButtons() {
    const H_account = 'Account';
    const H_cart = 'Cart';
    const H_list = 'Wishlist';

    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState<number | null>(null);
    const [wishlistCount, setWishlistCount] = useState<number | null>(null);

    const handleAccount = async (event: any) => {
        event.preventDefault();

        const fetchData = async () => {
            try
            {
              const response = await fetch(`http://localhost:8080/protected`,{
                method: 'GET',
                credentials: 'include',
              });

              if(!response.ok)
              {
                throw new Error('Request failed');
              }
    
              const data = await response.json();;

              if(data.success === 1)
              {
                navigate('/dashboard', { state: { page: 'orders'}});
              }
              else if(data.success === 0)
              {
                navigate('/login');
              }            
            }
            catch(error)
            {
              console.error(error);
            }
          };
          fetchData();

    }

    const handleClick = (content: string) => {
      if(content === 'cart')
      {
        navigate('/dashboard', { state: { page: 'cart'}});
      }
      else if(content === 'wishlist')
      {
        navigate('/dashboard', { state: { page: 'wishlist'}});
      }
      else
      {
        navigate('/dashboard');
      }
    }

    useEffect(() => {
      const getCartCount = () => {
        const cart = localStorage.getItem('cart');
        const cartParsed = cart ? JSON.parse(cart) : [];

        if(cartParsed.length === 0 || cartParsed === undefined || cartParsed === null) return;

        setCartCount(cartParsed.length);
      }

      const getWishlistCount = () => {
        const wishlist = localStorage.getItem('wishlist');
        const wishlistParsed = wishlist ? JSON.parse(wishlist) : [];

        if(wishlistParsed.length === 0 || wishlistParsed === undefined || wishlistParsed === null) return;

        setWishlistCount(wishlistParsed.length);
      }
      
      getCartCount();
      getWishlistCount();
      
    }, []);


    //navigate('/search-result', { state: { productIdList: productIdList}});
    return (
    <div className='NavBarButtons'>
        <div className='koszyk' onClick={() => handleClick('cart')}>
            { cartCount && <NotifcationCount count={cartCount}/>}
            <NavBtn icon={cart_img} heading={H_cart}/>
        </div>
        <div className='lista' onClick={() => handleClick('wishlist')}>
            { wishlistCount && <NotifcationCount count={wishlistCount}/>}
            <NavBtn icon={list_img} heading={H_list} />
        </div>
        <div onClick={handleAccount} className='konto'>
            <NavBtn icon={account_img} heading={H_account} />
        </div>
    </div>
  )
}

export default NavBarButtons