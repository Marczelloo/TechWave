import logo from '../../assets/temp_logo.webp'
import SearchBar from '../SearchBar/SearchBar';
import NavBarButtons from './NavBarButtons';

import '../../style/Navbar/NavBar.css'

import { Link } from "react-router-dom";
import { useEffect } from 'react';

const Navbar = () => {
  
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    })

  }, [])

  return (
    <nav className='navbar'>
        <Link to="../" className="ikona">
            <img src={logo} alt="TechWaveIcon" />
            <h1> Tech<span className="span-aqua">Wave</span></h1>
        </Link>
        <div className="search-bar">
            <SearchBar/>
        </div>
        <div className="nav-buttons">
            <NavBarButtons/>
        </div>
    </nav>
  )
}

export default Navbar;