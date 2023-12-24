import '../../style/Dashboard/DashboardContent.css';

import Orders from './DashboardOrders';
import Cart from './DashboardCart';
import Wishlist from './DashboardWishlist';
import Reviews from './DashboardReviews';
import Settings from './DashboardSettings';
import Logout from './DashboardLogout';

type Props = {
    selectedContent: string,
    setSelectedContent: (conent: string) => void,
    setReloadNavbar: (reload: boolean) => void, // Add this line
}

function DashboardContent({ selectedContent, setSelectedContent, setReloadNavbar }: Props) {
    const displayContent = () => {
        switch(selectedContent){
            case 'orders':
                return <Orders/>
            break;
            case 'cart':
                return <Cart setReloadNavbar={setReloadNavbar}/>
            break;
            case 'wishlist':
                return <Wishlist setReloadNavbar={setReloadNavbar}/>
            break;
            case 'reviews':
                return <Reviews/>
            break;
            case 'settings':
                return <Settings/>
            break;
            case 'logout':
                return <Logout setSelectedContent={setSelectedContent}/>
            break;
            default:
                return <Orders/>
        }
    }
  return (
    <div className='dashboard-content-container'>
        {
            displayContent()
        }
    </div>
  )
}

export default DashboardContent