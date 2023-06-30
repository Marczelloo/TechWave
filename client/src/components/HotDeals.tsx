import '../style/HotDeals.css';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';

function HotDeals() {
  const [timeRemaining, setTimeRemaining] = useState<String>('');

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
        <ProductCard name='Samsung Galaxy S21 FE 128/8GB 5G fjabshddasds' price={2599.99} sale={true} />
        <ProductCard name='default-name' price={0} sale={true} />
        <ProductCard name='default-name' price={0} sale={true} />
        <ProductCard name='default-name' price={0} sale={true} />
        <ProductCard name='default-name' price={0} sale={true} />
        <ProductCard name='default-name' price={0} sale={true} />
        <ProductCard name='default-name' price={0} sale={true} />
      </div>
    </div>
  )
}

export default HotDeals