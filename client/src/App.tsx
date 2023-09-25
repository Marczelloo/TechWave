import { createBrowserRouter, RouterProvider} from "react-router-dom"; 

import './Variables.css';
import './App.css';

import Home from './components/Home';
import Product from './components/Product';
import NewsPage from './components/NewsPage';
import UnderConstruction from './components/UnderConstruction';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

import { PopupProvider } from './components/PopupProvider';

import Popup from './components/Popup';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/Product",
    element: <Product/>
  },
  {
    path: "/News",
    element: <NewsPage/>
  },
  {
    path: "/Underconstruction",
    element: <UnderConstruction/>
  },
  {
      path: '/Dashboard',
      element: <Dashboard/>,
  },
  {
    path: '/Cart',
    element: <Dashboard page="cart"/>,
  },
  {
    path: '/Wishlist',
    element: <Dashboard page="wishlist"/>,
  },
  {
      path: '/Login',
      element: <Login/>,
  },
  {
      path: '/Register',
      element: <Register/>,
  }
]);

function App() {
  return (
    <PopupProvider>
          <RouterProvider router={Router} />
          <Popup />
    </PopupProvider>
  )
}

export default App