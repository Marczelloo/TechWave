import '../style/News.css';
import NewsCard from './NewsCard';
import { useState, useEffect } from 'react';

function News() {
  const newsCount = 9; // later replace this with the size of the array

  const timeToAutoSlide = 5;

  const [newsPage, setNewsPage] = useState(1);

  const [leftBtnVis, setLeftBtnVis] = useState(false);
  const [rightBtnVis, setRightBtnVis] = useState(true);

  const [autoSlideTime, setAutoSlideTime] = useState(0);

  useEffect(() => {
    const slideNews = () => {
      if (newsPage < newsCount) setNewsPage((prevPage) => prevPage + 1);
      else setNewsPage(1);
    };

    const interval = setInterval(() => {
      if (autoSlideTime >= timeToAutoSlide) {
        slideNews();
        setAutoSlideTime(0);
      } else {
        setAutoSlideTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [newsPage, autoSlideTime, newsCount]);

  useEffect(() => {
    updateVis();
  }, [newsPage]);

  const PreviousPage = () => {
    if (newsPage > 1) {
      setNewsPage((prevPage) => prevPage - 1);
      setAutoSlideTime(0);
    }
  };

  const NextPage = () => {
    if (newsPage < newsCount) {
      setNewsPage((prevPage) => prevPage + 1);
      setAutoSlideTime(0);
    }
  };

  const updateVis = () => {
    setLeftBtnVis(newsPage > 1);
    setRightBtnVis(newsPage < newsCount);
  };

  console.log('News Page: ' + newsPage);
  console.log('Auto slide time: ' + autoSlideTime);

  return (
    <div className='news-wrapper'>
      <h1>News</h1>
      <div className='news-container'>
        {leftBtnVis && (
          <button onClick={PreviousPage} className='left-button'>
            {'<'}
          </button>
        )}
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        <NewsCard header='News fhahgwugfyayufwgway uehgfiusefheuh' desc='Desc dada' newsPage={newsPage} />
        {rightBtnVis && (
          <button onClick={NextPage} className='right-button'>
            {'>'}
          </button>
        )}
      </div>
    </div>
  );
}

export default News;
