import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../../style/Searchbar/SearchResultPage.css';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import ProductCard from '../Product/ProductCard';

import { usePopup } from '../Popup/PopupProvider';

type ProductList = {
    id: number,
    name: string,
    price: number,
    image: string,
}

const SearchResultPage = () => {
    const location = useLocation();    
    const productIdList = location.state.productIdList.map((element: { id: number; })  => element.id);

    const [productList, setProductList] = useState<ProductList[]>([]);

    const { showPopup } = usePopup();

    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const itemsPerPage = 16;
    const [orderByOption, setOrderByOption] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try
            {
            const response = await fetch('http://localhost:8080/get_productsByIds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idList: productIdList,
                    page: page,
                    itemsPerPage: itemsPerPage,
                    orderBy: orderByOption,
                    maxPrice: maxPrice,
                    minPrice: minPrice
                })
            });

            if(!response.ok)
            {
                throw new Error("Product request failed!");
            }

            const data = await response.json();

            console.log(data);
            if(data.success === 1)
            {
                setMaxPage(data.maxPage);
                if(productIdList === data.result) return;
                setProductList(data.result);
            }
            else if(data.success === 0)
            {   
                setProductList([]);
                console.log(data.info);
            }
            }
            catch(error)
            {
                setProductList([]);
                console.log(error);
            }
        }

        if(minPrice > maxPrice)
        {
            showPopup("Min price can't be greater than max price!");
            return;
        }
        fetchProducts();
    }, [page, orderByOption, maxPrice, minPrice])

    const handleOrderChange = (e: string) => {
        setOrderByOption(e);
    }

    const handleNextPage = (e: any) => { 
        e.preventDefault();
        if(page >= maxPage) return;
        setPage(page + 1);
    }

    const handlePrevPage = (e: any) => {
        e.preventDefault();
        if(page <= 1) return;
        setPage(page - 1);
    }

    const handleMaxPriceChange = (e: number) => {
        setMaxPrice(e);
    }

    const handleMinPriceChange = (e: number) => {
        setMinPrice(e);
    }
 
    //TODO: -make working pages
    // -make working orders
  return (
    <div className='wrapper'>
        <Navbar/>
        <div className='search-result-container'>
            <h2> Search result: </h2>
            <div className='search-result-manage-buttons'>
                <p> Min:</p>
                <input type='number' min='0' max='1000000' placeholder='0' onChange={(e) => handleMinPriceChange(parseInt(e.target.value))}/> <p> $ </p>
                <p> Max:</p>
                <input type='number' min='0' max='1000000' placeholder='0' onChange={(e) => handleMaxPriceChange(parseInt(e.target.value))}/>
                <p> $ </p>
                <p> Order by: </p>
                <select value={orderByOption} onChange={(e) => handleOrderChange(e.target.value)}>
                    <option value=""> No order </option>
                    <option value="ByPriceAscending"> By price ascending </option>
                    <option value="ByPriceDescending"> By price descending </option>
                </select>
                <button className='search-result-prev-page' onClick={(e) => handlePrevPage(e)}> {"<"} </button>
                <p className='search-result-display-page'> {page} / {maxPage} </p>
                <button className='search-result-next-page' onClick={(e) => handleNextPage(e)}> {">"} </button>
            </div>
            <div className='search-result-items-container'>
                {
                    productList.map((product) => {
                        return <ProductCard
                            key={product.id + " " + product.name}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    })
                }
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default SearchResultPage