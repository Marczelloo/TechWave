import logo from '../assets/temp_logo.webp';
import SearchBar from './SearchBar';
import NavBarButtons from './NavBarButtons';
import '../style/NavBar.css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';

export default function Navbar() {

  useEffect(() => {
    //window.scrollTo(0, 0);
  })

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