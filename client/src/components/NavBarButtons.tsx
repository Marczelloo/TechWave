import NavBtn from './NavBtn';
import { Link, useNavigate} from 'react-router-dom';

import '../style/NavBarButtons.css';

import account from '../assets/account.png';
import cart from '../assets/cart.png';
import list from '../assets/list.png';


function NavBarButtons() {
    const H_account = 'Account';
    const H_cart = 'Cart';
    const H_list = 'Wishlist';

    const navigate = useNavigate();

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

              console.log(data);

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

  return (
    <div className='NavBarButtons'>
        <Link to='/Cart' className='koszyk' onClick={() => setDashboardContent('cart')}>
            <NavBtn icon={cart} heading={H_cart} />
        </Link>
        <Link to='/Wishlist' className='lista' onClick={() => setDashboardContent('wishlist')}>
            <NavBtn icon={list} heading={H_list} />
        </Link>
        <div onClick={handleAccount} className='konto'>
            <NavBtn icon={account} heading={H_account} />
        </div>
    </div>
  )
}

export default NavBarButtons