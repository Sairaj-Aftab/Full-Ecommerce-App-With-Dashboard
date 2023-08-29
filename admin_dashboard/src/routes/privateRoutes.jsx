import PageLayout from "../components/PageLayout/PageLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Permission from "../pages/Permission/Permission";
import Profile from "../pages/Profile/Profile";
import Role from "../pages/Role/Role";
import Users from "../pages/Users/Users";
import PrivateRouteGird from "./PrivateRouteGird";

const privateRoutes = [
  {
    element: <PageLayout />,
    children: [
      {
        element: <PrivateRouteGird />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/rule",
            element: <Role />,
          },
          {
            path: "/permission",
            element: <Permission />,
          },
        ],
      },
    ],
  },
];

export default privateRoutes;
