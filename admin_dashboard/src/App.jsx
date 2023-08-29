import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLogedInUser } from "./features/auth/authApiSlice";
import "./app.css";
import {
  getAllPermission,
  getAllRules,
  getAllUser,
} from "./features/user/userApiSllice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(getLogedInUser());
    }
    dispatch(getAllPermission());
    dispatch(getAllRules());
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <>
      <ToastContainer style={{ zIndex: "9999999999999" }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
