import logo from '../assets/temp_logo.webp';
import SearchBar from './SearchBar';
import NavBarButtons from './NavBarButtons';
import '../style/NavBar.css'

export default function Navbar() {
  return (
    <nav className='navbar'>
        <a className="ikona">
            <img src={logo} alt="TechWaveIcon" />
            <h1> Tech<span className="span-aqua">Wave</span></h1>
        </a>
        <div className="search-bar">
            <SearchBar/>
        </div>
        <div className="nav-buttons">
            <NavBarButtons/>
        </div>
    </nav>
  )
}