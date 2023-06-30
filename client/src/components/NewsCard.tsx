import '../style/NewsCard.css';
import img from '../assets/default_image.webp';
import { Link } from 'react-router-dom';

type Props = {
    id?: number, 
    header: string,
    desc: string
}

function NewsCard({id, header, desc}: Props) {
  return (
    <Link to="./News" className='newscard-container'>
        <div className='image-container'>
            <img src={img} alt="news-img"/>
        </div>
        <h1> {header} </h1>
        <p> {desc} </p>
    </Link>
  )
}

export default NewsCard