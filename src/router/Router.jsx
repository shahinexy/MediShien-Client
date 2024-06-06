
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ErrorPage from "../pages/Home/ErrorPage/ErrorPage";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Dashboard from "../Dashboard/Dashboard";
import PaymentHistory from "../Dashboard/User/PaymentHistory";
import UserProfile from "../Dashboard/UserProfile";
import ManageMedicines from "../Dashboard/Seller/ManageMedicines";
import SellerPaymentHistory from "../Dashboard/Seller/SellerPaymentHistory";
import Advertisement from "../Dashboard/Seller/Advertisement";
import PrivetRoute from './PrivetRoute';
import ManageUser from "../Dashboard/Admin/ManageUser";
import ManageCategory from "../Dashboard/Admin/ManageCategory";
import ManageAdvertise from "../Dashboard/Admin/ManageAdvertise";
import CartPage from "../pages/Cart/CartPage";



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
          path: '/cart',
          element: <CartPage></CartPage>
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
      element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children: [
        // ==== user routs ===
        {
          path: 'userProfile',
          element: <UserProfile></UserProfile>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },

        // ===== seller routs =====
        {
          path: 'manageMedicines',
          element: <ManageMedicines></ManageMedicines>
        },
        {
          path: 'sellerPaymentHistory',
          element: <SellerPaymentHistory></SellerPaymentHistory>
        },
        {
          path: 'sellerAdvertisement',
          element: <Advertisement></Advertisement>
        },

        // ====== Admin Route =======
        {
          path: 'manageUser',
          element: <ManageUser></ManageUser>
        },
        {
          path: 'manageCategory',
          element: <ManageCategory></ManageCategory>
        },
        {
          path: 'manageAdvertise',
          element: <ManageAdvertise></ManageAdvertise>
        }
      ]
    }
  ]);

  export default router;