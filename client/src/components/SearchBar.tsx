import search from '../assets/search.png';
import '../style/SearchBar.css';

function SearchBar() {
  return (
    <div className='SearchBar-container'>
        <div className='SearchBar'>
            <input className='SearchBarInput' type='text' name='search-bar' placeholder='Search'></input>
        </div>
        <div className='SearchBtn'>
            <img className='SearchIcon' src={search} alt='search'></img> 
        </div>
    </div>
    
  )
}

export default SearchBar