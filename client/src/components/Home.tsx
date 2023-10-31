import Navbar from './Navbar/Navbar';
import HotDeals from './Hotdeals Recommended/HotDeals';
import News from './News/News';
import Footer from './Footer';
import Recommended from './Hotdeals Recommended/Recommended';

function Home() {
  return (
    <div className="wrapper">
      <Navbar/>
      <Recommended/>
      <HotDeals/>
      <News/>
      <Footer/>
    </div>
  )
}

export default Home