import {useState} from 'react';

import '../style/Dashboard.css';

import Navbar from './Navbar'
import Footer from './Footer'
import DashboardNavbar from './DashboardNavbar';
import DashboardContent from './DashboardContent';

type Props = {}

function Dashboard({}: Props) {
  const [selectedContent, setSelectedContent] = useState<string>('');

  const handleDashboardContentChange = (content: string) => {
      setSelectedContent(content);
  }

  return (
    <div>
      <Navbar/>
      <div className='dashboard-container'>
        <DashboardNavbar onContentChange={handleDashboardContentChange} />
        <DashboardContent selectedContent={selectedContent} />
      </div>
      <Footer/>
    </div>
  )
}

export default Dashboard