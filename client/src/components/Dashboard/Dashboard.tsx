import {useEffect, useState} from 'react';

import '../../style/Dashboard/Dashboard.css';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';
import { useLocation } from 'react-router-dom';

//TODO: - add orders page
// - add product order, pay page and functionality
// - add pages to search page and filter functionality

function Dashboard() {
  const location = useLocation();    
  const page = location.state?.page ?? 'orders';
  const [selectedContent, setSelectedContent] = useState<string>(page);
  
  useEffect(() => {
    setSelectedContent(page)
  }, [page])
  

  const handleDashboardContentChange = (content: string) => {
      setSelectedContent(content);
  }

  return (
    <div>
      <Navbar/>
      <div className='dashboard-container'>
        <DashboardNavbar onContentChange={handleDashboardContentChange} page={selectedContent} />
        <DashboardContent selectedContent={selectedContent} setSelectedContent={setSelectedContent}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard