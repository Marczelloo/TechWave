import Navbar from './Navbar';
import HotDeals from './HotDeals';
import News from './News';
import Footer from './Footer';
import Recommended from './Recommended';

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