
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ErrorPage from "../pages/Home/ErrorPage/ErrorPage";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Dashboard from "../Dashboard/Dashboard";
import PaymentHistory from "../Dashboard/User/PaymentHistory";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/shop',
          element: <Shop></Shop>
        },
        {
          path:'register',
          element: <Register></Register>
        },
        {
          path: '/login',
          element: <Login></Login>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'payment',
          element: <PaymentHistory></PaymentHistory>
        }
      ]
    }
  ]);

  export default router;