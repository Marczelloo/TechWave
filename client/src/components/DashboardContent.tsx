import '../style/DashboardContent.css';

import Orders from '../components/DashboardOrders';
import Cart from '../components/DashboardCart';
import Wishlist from '../components/DashboardWishlist';
import Reviews from '../components/DashboardReviews';
import Settings from '../components/DashboardSettings';
import Logout from '../components/DashboardLogout';

type Props = {
    selectedContent: string,
    setSelectedContent: (conent: string) => void,
}

function DashboardContent({ selectedContent, setSelectedContent }: Props) {
    const displayContent = () => {
        switch(selectedContent){
            case 'orders':
                return <Orders/>
            break;
            case 'cart':
                return <Cart/>
            break;
            case 'wishlist':
                return <Wishlist/>
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