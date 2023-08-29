import Forgot from "../pages/Auth/Forgot";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PublicGird from "./PublicGird";

const publicRoutes = [
  {
    element: <PublicGird />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot",
        element: <Forgot />,
      },
    ],
  },
];

export default publicRoutes;
