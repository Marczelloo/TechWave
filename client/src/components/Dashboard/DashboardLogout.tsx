import "../../style/Dashboard/DashboardLogout.css";
import { usePopup } from "../Popup/PopupProvider";
import { useEffect } from 'react';

type Props = {
  setSelectedContent: (conent: string) => void,
}

function DashboardLogout({ setSelectedContent}: Props) {
  const { showPopup } = usePopup();

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    
    return () => {
      document.body.style.overflowY = 'unset';
    }
  })

  const logout = async (e : any) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8080/get_logout',{
      method: 'GET',
      credentials: 'include',
    });

    if(!response.ok)
    {
      throw new Error('Request failed while logging out!');
    }

    const data = await response.json();

    if(data.success === 1)
    {
      console.log('Logged out!');
      showPopup("Logged out successfully!");
      window.location.href = '/';
    }
    else
    {
      showPopup("There was an error while logging out! Try again later!");
      console.log('Not logged out!');
    }
    
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
  }

  const backToOrders = () => {
    setSelectedContent('orders');
    document.body.style.overflowY = 'unset';
  }
  
  return (
    <div className='dashboard-logout-container'>
      <h2> Do you want to logout? </h2>
      <div className='dashboard-logout-buttons'>
        <button onClick={(e) => logout(e)}> Yes </button>
        <button onClick={backToOrders}> No </button>
      </div>
    </div>
  )
}

export default DashboardLogout