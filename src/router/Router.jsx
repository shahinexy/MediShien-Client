
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
import CategoryPage from "../pages/CategoryPage.jsx/CategoryPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import PaymentManagement from "../Dashboard/Admin/PaymentManagement";
import SalesReport from "../Dashboard/Admin/SalesReport";
import InvoicePage from "../pages/InvoicePage/InvoicePage";
import SellerHome from "../Dashboard/Seller/SellerHome";
import AdminHome from "../Dashboard/Admin/AdminHome";



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
          element: <Shop></Shop>,
          loader: ()=> fetch(`${import.meta.env.VITE_SERVER_URL}/medicinesCount`)
        },
        {
          path: '/cart',
          element: <CartPage></CartPage>
        },
        {
          path: '/categoryPage/:category',
          element: <CategoryPage></CategoryPage>,
          loader: ({params}) => fetch(`${import.meta.env.VITE_SERVER_URL}/medicines/category/${params.category}`)
        },
        {
          path: '/checkOut',
          element: <CheckOutPage></CheckOutPage>
        },
        {
          path: '/invoice',
          element: <InvoicePage></InvoicePage>
        },
        {
          path:'/register',
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
        {
          path: 'sellerHome',
          element: <SellerHome></SellerHome>
        },

        // ====== Admin Route =======
        {
          path: 'adminHome',
          element: <AdminHome></AdminHome>
        },
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
        },
        {
          path: 'paymentManagement',
          element: <PaymentManagement></PaymentManagement>
        },
        {
          path: 'salesReport',
          element: <SalesReport></SalesReport>
        }
      ]
    }
  ]);

  export default router;