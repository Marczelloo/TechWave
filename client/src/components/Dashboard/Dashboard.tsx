import {useEffect, useState} from 'react';

import '../../style/Dashboard/Dashboard.css';

import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';
import { useLocation } from 'react-router-dom';

//TODO: - add orders page
// - add product order, pay page and functionality

function Dashboard() {
  const location = useLocation();    
  const page = location.state?.page ?? 'orders';
  const [selectedContent, setSelectedContent] = useState<string>(page);
  const [reloadNavbar, setReloadNavbar] = useState<boolean>(false); // Add this line
  

  useEffect(() => {
    setSelectedContent(page)
  }, [page])
  
  useEffect(() => {
    if (reloadNavbar) {
      setReloadNavbar(false); // Reset the state after reloading
    }
  }, [reloadNavbar])

  const handleDashboardContentChange = (content: string) => {
      setSelectedContent(content);
  }

  return (
    <div>
      <Navbar reloadCount={reloadNavbar}/>
      <div className='dashboard-container'>
        <DashboardNavbar onContentChange={handleDashboardContentChange} page={selectedContent} />
        <DashboardContent selectedContent={selectedContent} setSelectedContent={setSelectedContent} setReloadNavbar={setReloadNavbar}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard