import '../style/Recommended.css';
import ProductCard from './ProductCard';

function Recommended() {
  return (
    <div className='recommended-wrapper'>
      <h1> We recommend</h1>
      <div className="recommended-container">
        <ProductCard name='Samsung Galaxy S21 FE 128/8GB 5G fjabshddasds' price={2599.99} />
        <ProductCard name='default-name' price={0} />
        <ProductCard name='default-name' price={0} />
        <ProductCard name='default-name' price={0} />
        <ProductCard name='default-name' price={0} />
        <ProductCard name='default-name' price={0} />
        <ProductCard name='default-name' price={0} />
      </div>
    </div>
  )
}

export default Recommended