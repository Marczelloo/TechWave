import '../style/Recommended.css';
import ProductCard from './ProductCard';
import { useState, useEffect, Key } from 'react';

function Recommended() {
  const [recommended, setRecommended] = useState(null);

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

  console.log(recommended);
  return (
    <div className='recommended-wrapper'>
      <h1> We recommend</h1>
      <div className="recommended-container">
        {recommended ? (
          recommended.map((recommendation: { id: Key | null | undefined; name: string; price: number; short_spec: string; images: string[]; }) => (
            <ProductCard
              key={recommendation.id}
              name={recommendation.name}
              price={recommendation.price}
              image={recommendation.images[0]}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default Recommended