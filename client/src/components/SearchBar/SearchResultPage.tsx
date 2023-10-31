import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../../style/Searchbar/SearchResultPage.css';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';
import ProductCard from '../Product/ProductCard';

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

    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(10);
    const [orderByOption, setOrderByOption] = useState<string>('');

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
                    idList: productIdList
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
                setProductList(data.result);
            }
            else
            {
                console.log(data.info);
            }
            }
            catch(error)
            {
                console.log(error);
            }
        }

        fetchProducts();
    }, [])

    const handleOrderChange = (e: string) => {
        setOrderByOption(e);
    }

    //TODO: -make working pages
    // -make working orders
  return (
    <div className='wrapper'>
        <Navbar/>
        <div className='search-result-container'>
            <h2> Search result: </h2>
            <div className='search-result-manage-buttons'>
                <p> Order by: </p>
                <select value={orderByOption} onChange={(e) => handleOrderChange(e.target.value)}>
                    <option value=""> No order </option>
                    <option value="ByPriceAscending"> By price ascending </option>
                    <option value="ByPriceDescending"> By price descending </option>
                </select>
                <button className='search-result-prev-page'> {"<"} </button>
                <p className='search-result-display-page'> {page} / {maxPage} </p>
                <button className='search-result-next-page'> {">"} </button>
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