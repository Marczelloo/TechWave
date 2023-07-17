import '../style/NewsCard.css';
import { Link } from 'react-router-dom';

type Props = { 
    header: string,
    desc: string,
    newsPage: number,
    image: string,
}

function NewsCard({ header, desc, newsPage, image}: Props) {
    
  return (
    <div className='newscard-wrapper' style={{ transform: `translateX(${ -(newsPage - 1) * 100}%)`}}>
        <Link to="./News" className='newscard-container' >
        <div className='image-container'>
            <img src={image} alt="news-img"/>
        </div>
        <h1> {header} </h1>
        <p> {desc} </p>
        </Link>
    </div>
  )
}

export default NewsCard