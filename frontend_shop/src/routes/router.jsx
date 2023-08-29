import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publicRouter";
import privateRoutes from "./privateRoutes";
import Layout from "../layouts/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [...publicRoutes, ...privateRoutes],
  },
]);

export default router;
