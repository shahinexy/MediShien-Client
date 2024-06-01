
import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ErrorPage from "../pages/Home/ErrorPage/ErrorPage";



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
        }
      ]
    },
  ]);

  export default router;