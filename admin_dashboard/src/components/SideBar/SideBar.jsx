import { Link, useLocation } from "react-router-dom";
import GetUserData from "../../hooks/getUserData";

const SideBar = () => {
  const location = useLocation();
  const { user } = GetUserData();
  console.log(user);
  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div id="sidebar-menu" className="sidebar-menu">
          <ul>
            <li className="menu-title">
              <span>Main</span>
            </li>
            {user?.role?.permissions?.includes("Dashboard") && (
              <li className={`${location.pathname === "/" && "active"}`}>
                <Link to="/">
                  <i className="fe fe-home"></i> <span>Dashboard</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Order") && (
              <li>
                <Link to="/order">
                  <i className="fe fe-home"></i> <span>Order</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Products") && (
              <li>
                <Link to="/products">
                  <i className="fe fe-home"></i> <span>Products</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Category") && (
              <li>
                <Link to="/">
                  <i className="fe fe-home"></i> <span>Category</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Tags") && (
              <li>
                <Link to="/tags">
                  <i className="fe fe-home"></i> <span>Tag</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Brands") && (
              <li>
                <Link to="/brands">
                  <i className="fe fe-home"></i> <span>Brands</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Users") && (
              <li className={`${location.pathname === "/users" && "active"}`}>
                <Link to="/users">
                  <i className="fe fe-users"></i> <span>Users</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Rule") && (
              <li className={`${location.pathname === "/rule" && "active"}`}>
                <Link to="/rule">
                  <i className="fe fe-users"></i> <span>Rule</span>
                </Link>
              </li>
            )}
            {user?.role?.permissions?.includes("Permissions") && (
              <li
                className={`${location.pathname === "/permission" && "active"}`}
              >
                <Link to="/permission">
                  <i className="fe fe-users"></i> <span>Permission</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
