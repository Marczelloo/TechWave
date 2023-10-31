import "../style/DashboardLogout.css";

type Props = {
  setSelectedContent: (conent: string) => void,
}

function DashboardLogout({ setSelectedContent}: Props) {

  const logout = (e : any) => {
    e.preventDefault();

    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=localhost; path=/;";
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=localhost; path=/;";
    window.location.href = '/';
  }

  const backToOrders = () => {
    setSelectedContent('orders');
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