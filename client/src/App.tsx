import { createBrowserRouter, RouterProvider} from "react-router-dom"; 

import './Variables.css';
import './App.css';

import Home from './components/Home';
import Product from './components/Product/Product';
import NewsPage from './components/News/NewsPage';
import UnderConstruction from './components/UnderConstruction';
import Login from './components/Login Register/Login';
import Register from './components/Login Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import SearchResultPage from './components/SearchBar/SearchResultPage';

import { PopupProvider } from './components/Popup/PopupProvider';

import Popup from './components/Popup/Popup';

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
  },
  {
      path: '/Search-result',
      element: <SearchResultPage/>,
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