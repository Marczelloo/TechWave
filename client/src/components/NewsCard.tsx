import '../style/NewsCard.css';
import img from '../assets/default_image.webp';
import { Link } from 'react-router-dom';

type Props = {
    id?: number, 
    header: string,
    desc: string,
    newsPage: number,
}

function NewsCard({id, header, desc, newsPage}: Props) {
    
  return (
    <div className='newscard-wrapper' style={{ transform: `translateX(${ -(newsPage - 1) * 100}%)`}}>
        <Link to="./News" className='newscard-container' >
        <div className='image-container'>
            <img src={img} alt="news-img"/>
        </div>
        <h1> {header} </h1>
        <p> {desc} </p>
        </Link>
    </div>
  )
}

export default NewsCard