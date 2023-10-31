import { Link } from 'react-router-dom';
import '../style/QuickSearchItem.css';

type Props = {
    id: number,
    name: string,
    price: number,
    image: string,
}

const QuickSearchItem = (props: Props) => {
  return (
    <Link to={{ pathname: '../Product', search: `product_id=${props.id}`}} className='quicksearchitem-container'>
        <img src={props.image} alt={props.name + ' product image'} />
        <p> {props.name} </p>
        <p> {props.price}&nbsp;$</p>
    </Link>
  )
}

export default QuickSearchItem;