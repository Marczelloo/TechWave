import '../style/News.css';
import NewsCard from './NewsCard';

function News() {
  return (
    <div className='news-wrapper'>
      <h1> News </h1>
      <div className="news-container">
        <button className="left-button">{'<'}</button>
        <NewsCard header="News fhahgwugfyayufwgway uehgfiusefheuh" desc="Desc dada"/>
        <NewsCard header="News fhahgwugfyayufwgway uehgfiusefheuh" desc="Desc dada"/>
        <NewsCard header="News fhahgwugfyayufwgway uehgfiusefheuh" desc="Desc dada"/>
        <NewsCard header="News fhahgwugfyayufwgway uehgfiusefheuh" desc="Desc dada"/>
        <NewsCard header="News fhahgwugfyayufwgway uehgfiusefheuh" desc="Desc dada"/>
        <NewsCard header="News fhahgwugfyayufwgway uehgfiusefheuh" desc="Desc dada"/>
        <button className="right-button">{'>'}</button>
      </div>
    </div>
  )
}

export default News