import React from 'react'
import Navbar from './Navbar';
import HotDeals from './HotDeals';
import News from './News';

function Home() {
  return (
    <div className="wrapper">
      <Navbar/>
      <HotDeals/>
      <News/>
      <footer/>
    </div>
  )
}

export default Home