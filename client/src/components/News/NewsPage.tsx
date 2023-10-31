import '../../style/News/NewsPage.css';
import NavBar from '../Navbar/Navbar';
import Footer from '../Footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState  } from 'react';

type Props = {}

interface News {
  header: string,
  content: string,
  image: string,
}

function NewsPage({}: Props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [news, setNews] = useState<News | null>(null);
  const [image, setImage] = useState<string>('');

  const [blogText, setBlogText] = useState<String[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/news/${id}`);
        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        setNews(data);
        setImage(data.image);
        if (data && data.content) {
          const headers_regex = /\^([^]+?)\^/g;
          const paragraphs_regex = /\|([^|]+?)\|/g;

          let match;
          let headers = [];
          while ((match = headers_regex.exec(data.content)) !== null) {
            // The captured text inside the ^ braces will be available in match[1]
            headers.push(match[1]);
          }

          let texts = [];
          while ((match = paragraphs_regex.exec(data.content)) !== null) {
            texts.push(match[1]);
          }

          let blogTextTemp = [];
          for (let i = 0; i < texts.length; i++) {
            blogTextTemp.push(texts[i]);
            if (headers[i] != null || headers[i] != undefined) {
              blogTextTemp.push(headers[i]);
            }
          }
          setBlogText(blogTextTemp);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  console.log(news);

  return (
    <div className="wrapper">
      <NavBar/>
      <div className="newsPage-container">
        <h2 className='news-header'> { news != null ? news.header : "Loading..."}  </h2>
        <img className='news-banner' src={image} alt='news blog image'></img>
        { blogText.map((text, index) => {
          if(index % 2 === 0){
            return(<h3 className='article-paragraph'> {text} </h3>);
          }
          else
          {
            return(<p className='article-header'> {text} </p>);
          }
        })}
        
      </div>
      <Footer/>
    </div>
  )
}

export default NewsPage