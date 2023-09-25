import NavBtn from './NavBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState} from 'react';

import '../style/NavBarButtons.css';

import account_img from '../assets/account.png';
import cart_img from '../assets/cart.png';
import list_img from '../assets/list.png';

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
                navigate('/dashboard');
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

    const setDashboardContent = (content: string) => {
      localStorage.setItem('dashboard-content', content);
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

    return (
    <div className='NavBarButtons'>
        <Link to='/Cart' className='koszyk' onClick={() => setDashboardContent('cart')}>
            { cartCount && <NotifcationCount count={cartCount}/>}
            <NavBtn icon={cart_img} heading={H_cart}/>
        </Link>
        <Link to='/Wishlist' className='lista' onClick={() => setDashboardContent('wishlist')}>
            { wishlistCount && <NotifcationCount count={wishlistCount}/>}
            <NavBtn icon={list_img} heading={H_list} />
        </Link>
        <div onClick={handleAccount} className='konto'>
            <NavBtn icon={account_img} heading={H_account} />
        </div>
    </div>
  )
}

export default NavBarButtons