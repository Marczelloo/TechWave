import NavBtn from './NavBtn';
import {Link} from 'react-router-dom';

import '../style/NavBarButtons.css';

import account from '../assets/account.png';
import cart from '../assets/cart.png';
import list from '../assets/list.png';


function NavBarButtons() {
    const H_account = 'Account';
    const H_cart = 'Cart';
    const H_list = 'Wishlist';
  return (
    <div className='NavBarButtons'>
        <Link to='./Cart' className='koszyk'>
            <NavBtn icon={cart} heading={H_cart} />
        </Link>
        <Link to='./Lists' className='lista'>
            <NavBtn icon={list} heading={H_list} />
        </Link>
        <Link to='./Login' className='konto'>
            <NavBtn icon={account} heading={H_account} />
        </Link>
    </div>
  )
}

export default NavBarButtons