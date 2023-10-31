import '../../style/Hotdeals Recommended/Recommended.css';
import ProductCard from '../Product/ProductCard';
import { useState, useEffect } from 'react';

interface Recommended {
  id: number,
  name: string,
  price: number,
  images: Array<string>,
}

function Recommended() {
  const [recommended, setRecommended] = useState<Recommended[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/recommended');
        if(!response.ok) {
          throw new Error('Request failes');
        }

        const data = await response.json();
        setRecommended(data.product_list);
      }
      catch(error)
      {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='recommended-wrapper'>
      <h1> We recommend</h1>
      <div className="recommended-container">
        {recommended ? (
          recommended.map((recommendation: { id: number; name: string; price: number; images: string[]; }) => (
            <ProductCard
              key={'recommended - ' + recommendation.id + recommendation.name}
              id={recommendation.id}
              name={recommendation.name}
              price={recommendation.price}
              image={recommendation.images[0]}
            />
          ))
        ) : (
          <p className='loading'>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Recommended