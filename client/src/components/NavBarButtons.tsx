import NavBtn from './NavBtn';

import '../style/NavBarButtons.css';

import account from '../assets/account.png';
import cart from '../assets/cart.png';
import list from '../assets/list.png';

function NavBarButtons() {
    const H_account = 'Konto';
    const H_cart = 'Koszyk';
    const H_list = 'Lista';
  return (
    <div className='NavBarButtons'>
        <div className='koszyk'>
            <NavBtn icon={cart} heading={H_cart} />
        </div>
        <div className='lista'>
            <NavBtn icon={list} heading={H_list} />
        </div>
        <div className='konto'>
            <NavBtn icon={account} heading={H_account} />
        </div>
    </div>
  )
}

export default NavBarButtons