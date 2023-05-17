

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
  
   
  } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration.jsx";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import ViewPage from "./pages/ViewPage";
import EditPage from "./pages/EditPage";
import AddNewPage from "./pages/AddNewPage";



function Router() {


    const router = createBrowserRouter([
        {
          path: "/register",
          element:    <Registration/>,
        },
        {
          path: "/",
          element: <Login/>,
        },
        {
          path: "/home",
          element:  <Home/>,
        },
        {
          path: "/admin",
          element:    <AdminHome/>,
        },
        {
          path: "/api/users/:id",
          element:    <ViewPage/>,
        },
        {
          path: "/api/users/edit/:id",
          element:    <EditPage/>,
        },
        {
          path: "/api/users/admin/addnew",
          element:    <AddNewPage/>,
        },
      ])



  return (
  

<RouterProvider router={router} />
  
  )
}

export default Router