import Navbar from './Navbar';
import HotDeals from './HotDeals';
import News from './News';
import Recommended from './Recommended';

function Home() {
  return (
    <div className="wrapper">
      <Navbar/>
      <Recommended/>
      <HotDeals/>
      <News/>
      <footer/>
    </div>
  )
}

export default Home