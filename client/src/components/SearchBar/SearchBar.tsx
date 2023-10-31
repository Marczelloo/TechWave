import search from '../../assets/search.png';
import '../../style/Searchbar/SearchBar.css';
import QuickSearchItem from './QuickSearchItem';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import { usePopup } from "../Popup/PopupProvider";



interface quickSearchItemInterface {
  map?(arg0: (searchItem: quickSearchItemInterface) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: number,
  name: string,
  price: number,
  image: string,
}

function SearchBar() {
  const [quickSearchItems, setQuickSeachItems] = useState<quickSearchItemInterface[]>([]);
  const [searchItem, setSearchItem] = useState<string>('');

  const navigate = useNavigate();
  const { showPopup } = usePopup();

  useEffect(() => {

  }, [quickSearchItems])
  
  const handleOnChange = (e : string) => {
    setSearchItem(e);
    debouncedSearch(e);
  }

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchSeachItemsId();
  }

  const fetchQuickItems = async (searchTerm: string) => {
    const response = await fetch(`http://localhost:8080/get_ProductByName/${searchTerm}`,{ 
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'name': searchItem
    }
    });

    if(!response.ok) 
    {
      throw new Error("Product request failed!");
    }
    
    const data = await response.json();

    console.log(data);
    if (data.success === 1) {
      setQuickSeachItems( data.result );
    } else {
      setQuickSeachItems([]);
    }
  }

  const debouncedSearch = debounce((searchTerm) => {
    if (searchTerm === "" || searchTerm === undefined || searchTerm.length <= 2) {
      setQuickSeachItems([]);
      return;
    }
    fetchQuickItems(searchTerm);
  }, 500);
  
  const fetchSeachItemsId = async () => {
    if(searchItem === "" || searchItem.length <= 2 || searchItem === null)
    {
      return;
    }

    try
    {
    const response = await fetch(`http://localhost:8080/get_SearchProducts/${searchItem}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'name': searchItem
      }});

      if(!response.ok)
      {
        throw new Error("Error while searching for products");
      }

      const data = await response.json();

      const productIdList = data.productIdList;
      if(data.success === 1)
      {
        navigate('/search-result', { state: { productIdList: productIdList}});
      }
      else
      {
        showPopup("There was an error while searching for products! Try again later!");
      }
    }
    catch(error: any)
    {
      throw new Error(error.toString());
    }
  }
  

  const handleEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter')
    {
      fetchSeachItemsId();
    }
  }


  return (
    <div className='SearchBar-container'>
        <div className='SearchBar'>
            <input className='SearchBarInput' type='text' onChange={(e) => handleOnChange(e.target.value)} onKeyDown={handleEnterSearch} placeholder='Search'></input>
        </div>
        <div className='SearchBtn' onClick={(e) => handleSearch(e)}>
            <img className='SearchIcon' src={search} alt='search'></img> 
        </div>
        { quickSearchItems && quickSearchItems.length > 0 && 
          <div className='searchbar-quick-result-container'>
            {
              quickSearchItems.map((searchItem: quickSearchItemInterface) => {
                return <QuickSearchItem 
                  id={searchItem.id}
                  name={searchItem.name}
                  price={searchItem.price}
                  image={searchItem.image}
                />
              })
            }
          </div> 
        }
        
    </div>
  )
}

export default SearchBar