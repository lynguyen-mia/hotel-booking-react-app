import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./pages/auth/login";
import React from "react";
import Signup from "./pages/auth/signup";
import RootLayout from "./pages/RootLayout";
import Transaction, {
  loader as transactionLoader
} from "./pages/detail/Transaction";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/detail/:_id",
        element: <Detail />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/transaction",
        element: <Transaction />,
        loader: transactionLoader
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
