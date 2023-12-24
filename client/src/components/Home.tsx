import Navbar from './Navbar/Navbar';
import HotDeals from './Hotdeals Recommended/HotDeals';
import News from './News/News';
import Footer from './Footer';
import Recommended from './Hotdeals Recommended/Recommended';

import { useEffect, useState } from 'react';

function Home() {
  const [reloadNavbar, setReloadNavbar] = useState<boolean>(false);

  useEffect(() => {
    if (reloadNavbar) {
      setReloadNavbar(false);
    }
  }, [reloadNavbar])

  return (
    <div className="wrapper">
      <Navbar reloadCount={reloadNavbar}/>
      <Recommended setReloadNavbar={setReloadNavbar}/>
      <HotDeals setReloadNavbar={setReloadNavbar}/>
      <News/>
      <Footer/>
    </div>
  )
}

export default Home