import {useEffect, useState} from 'react';

import '../style/Dashboard.css';

import Navbar from './Navbar'
import Footer from './Footer'
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';
import { useLocation } from 'react-router-dom';

type Props = {

}

function Dashboard({ }: Props) {
  const location = useLocation();    
  const [selectedContent, setSelectedContent] = useState<string>(location.state.page);
  const page = location.state.page;
  
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