import '../style/HotDeals.css';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

function HotDeals() {
  const [timeRemaining, setTimeRemaining] = useState<String>('');
  const [hotdeals, setHotdeals] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/hotdeals');
        if(!response.ok) {
          throw new Error('Request failes');
        }

        const data = await response.json();
        setHotdeals(data.product_list);
      }
      catch(error)
      {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Function to calculate time remaining until midnight
    const calculateTimeRemaining = (): void => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const timeDifference = midnight.getTime() - now.getTime();
      const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutesRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const timeRemainingString = `${hoursRemaining}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
      setTimeRemaining(timeRemainingString);
    };

    calculateTimeRemaining();

    // Update the current time every second
    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='hotdeals-wrapper'>
      <h1> Hot Deals </h1>
      <h4> New Hot Deals In: {timeRemaining} </h4>
      <div className="hotdeals-container">
        { hotdeals ? (
            hotdeals.map((hotdeal: { id: number, name: string; price: number; sale_price: number, short_spec: string; images: string[]; }) => (
            <ProductCard
              key={hotdeal.id}
              name={hotdeal.name}
              price={hotdeal.price}
              new_price={hotdeal.sale_price}
              image={hotdeal.images[0]}
              sale={true}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default HotDeals