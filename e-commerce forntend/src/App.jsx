import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

import AppLayout from "./pages/AppLayout";
import ProductsPage from "./pages/ProductsPage";
import { ProductProvider } from "./context/ProductContext";

import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register ";
import CreateProduct from "./pages/CreateProduct";
import AdminPage from "./admin/AdminPage";
import Category from "./admin/Category";
import ViewOrder from "./admin/ViewOrder";
import ViewProduct from "./admin/ViewProduct";
import ViewUser from "./admin/ViewUser";
import AddAdmin from "./admin/AddAdmin";
import Order from "./pages/Order";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,

      children: [
        { path: "/", element: <Home /> },

        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/product/:id",
          element: <SingleProduct />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/order",
          element: <Order />,
        },
        // {
        //   path: "/createproduct",
        //   element: <CreateProduct />,
        // },
        {
          path: "/admin",
          element: <AdminPage />,
          children: [
            { path: "addproduct", element: <CreateProduct /> },
            { path: "category", element: <Category /> },
            { path: "viewproduct", element: <ViewProduct /> },
            { path: "vieworder", element: <ViewOrder /> },
            { path: "viewuser", element: <ViewUser /> },
            { path: "addadmin", element: <AddAdmin /> },
          ],
        },
      ],
    },
  ]);

  return (
    <ProductProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductProvider>
  );
};

export default App;
