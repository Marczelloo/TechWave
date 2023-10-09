import '../style/DashboardNavbar.css';

import orders_icon from '../assets/order.png';
import settings_icon from '../assets/settings.png';
import cart_icon from '../assets/addCart.png';
import list_icon from '../assets/addList.png';
import review_icon from '../assets/review.png';
import logout from '../assets/logout.png';
import login from '../assets/login.png';

import { useEffect, useState } from 'react';

type Props = {
    onContentChange: (content: string) => void,
    page?: string,
}

function DashboardNavbar({ onContentChange, page }: Props) {
    const [selectedItem, setSelectedItem] = useState<string>(page ? page : 'orders');
    const [loggedIn, setLoggedIn] = useState<boolean>();

    useEffect(() => {
        const fetchData = async () => {
            try
            {
                const response = await fetch('http://localhost:8080/protected', {
                    method: 'GET',
                    credentials: 'include',
                });

                if(!response.ok)
                {
                    throw new Error('Request failed');
                }

                const data = await response.json();

                if(data.success === 1)
                {
                    setLoggedIn(true);
                    setSelectedItem('orders');
                }
                else if(data.success === 0)
                {
                    setLoggedIn(false);
                    setSelectedItem('cart');
                }
            }
            catch(error)
            {
                console.error(error);
            }
        }

        fetchData();
    }, [])
    
    useEffect(() => {
        if(page != null) 
        setSelectedItem(page);
        else
        setSelectedItem('orders')
    }, [page])

    const handleItemClick = (content: string) => {
        onContentChange(content);
        setSelectedItem(content);
    }

  return (
    loggedIn ? ( 
    <div className='dashboard-navbar-container'>
        <div className={`dashboard-navbar-button ${selectedItem === 'orders' ? 'selected' : ''}`}
            onClick={ () => handleItemClick('orders')} >
            <img src={orders_icon} alt='order-button=img'/>
            <p> Orders </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button ${selectedItem === 'cart' ? 'selected' : ''}`}
            onClick={() => handleItemClick('cart')}>
            <img src={cart_icon} alt='cart-button-img'/>
            <p> Cart </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button ${selectedItem === 'wishlist' ? 'selected' : ''}`}
            onClick={() => handleItemClick('wishlist')}>
            <img src={list_icon} alt='wishlist-button-img'/>
            <p> Wishlist </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button ${selectedItem === 'reviews' ? 'selected' : ''}`}
            onClick={() => handleItemClick('reviews')}>
            <img src={review_icon} alt='reviews-button-img'/>
            <p> Reviews </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button ${selectedItem === 'settings' ? 'selected' : ''}`}
            onClick={() => handleItemClick('settings')}>
            <img src={settings_icon} alt='settings-button-img'/>
            <p> Account settings </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button  ${selectedItem === 'logout' ? 'selected' : ''}`}
            onClick={() => handleItemClick('logout')}>
            <img src={logout} alt='logout-button-img'/>
            <p> Logout </p>
            <div className='selected-dot'></div>
        </div>
    </div>
    ) 
    : 
    (
    <div className='dashboard-navbar-container'> 
        <div className={`dashboard-navbar-button ${selectedItem === 'cart' ? 'selected' : ''}`}
            onClick={() => handleItemClick('cart')}>
            <img src={cart_icon} alt='cart-button-img'/>
            <p> Cart </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button ${selectedItem === 'wishlist' ? 'selected' : ''}`}
            onClick={() => handleItemClick('wishlist')}>
            <img src={list_icon} alt='wishlist-button-img'/>
            <p> Wishlist </p>
            <div className='selected-dot'></div>
        </div>
        <div className={`dashboard-navbar-button ${selectedItem === 'login' ? 'selected' : ''}`} 
            onClick={() => handleItemClick('login')}>
            <img src={login} alt='login-button-img'/>
            <p> Login </p>
            <div className='selected-dot'></div>
        </div>
    </div>
    )
    
  )
}

export default DashboardNavbar