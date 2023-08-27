import './Variables.css';
import './App.css';
import Home from './components/Home';
import Product from './components/Product';
import NewsPage from './components/NewsPage';
import UnderConstruction from './components/UnderConstruction';
import Login from './components/Login';
import Register from './components/Register';
import { createBrowserRouter, RouterProvider} from "react-router-dom"; 

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
      path: '/Cart',
      element: <></>,
  },
  {
      path: '/List',
      element: <></>,
  },
  {
      path: '/Account',
      element: <></>,
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
    <RouterProvider router={Router} />
    
  )
}

export default App