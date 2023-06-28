import './Variables.css';
import './App.css';
import Home from './components/Home';
import { createBrowserRouter, RouterProvider} from "react-router-dom"; 

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
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
      path: '/account',
      element: <></>,
  },
  {
      path: '/Login',
      element: <></>,
  },
  {
      path: '/Register',
      element: <></>,
  }
]);

function App() {
  return (
    <RouterProvider router={Router} />
    
  )
}

export default App