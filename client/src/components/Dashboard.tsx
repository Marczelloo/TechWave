import {useState, useEffect} from 'react';

import '../style/Dashboard.css';

import Navbar from './Navbar'
import Footer from './Footer'
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';

type Props = {
  page?: string,
}

function Dashboard({ page }: Props) {
  const [selectedContent, setSelectedContent] = useState<string>(page ? page : "");

  console.log(page);

  const handleDashboardContentChange = (content: string) => {
      setSelectedContent(content);
  }

  useEffect(() => {
    if(page != null) 
    setSelectedContent(page);
    else
    setSelectedContent('orders');
  }, [page])  

  return (
    <div>
      <Navbar/>
      <div className='dashboard-container'>
        <DashboardNavbar onContentChange={handleDashboardContentChange} page={page} />
        <DashboardContent selectedContent={selectedContent} />
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard