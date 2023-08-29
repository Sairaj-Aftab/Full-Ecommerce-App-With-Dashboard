import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import ColorLogo from "../Logo/ColorLogo";
import SmallLogo from "../Logo/smallLogo";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/auth/authApiSlice";
import { setLogoutUser } from "../../features/auth/authSlice";
import GetUserData from "../../hooks/getUserData";
import swal from "sweetalert";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = GetUserData();

  const handleLogout = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`Successfully logout`, {
          icon: "success",
        });
        dispatch(logoutUser());
        dispatch(setLogoutUser());
      } else {
        swal("You are safe!");
      }
    });
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <ColorLogo />
        </Link>
        <Link to="/" className="logo logo-small">
          <SmallLogo width="30" height="30" />
        </Link>
      </div>

      <a href="javascript:void(0);" id="toggle_btn">
        <i className="fe fe-text-align-left"></i>
      </a>

      <div className="top-nav-search">
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Search here"
          />
          <button className="btn" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <a className="mobile_btn" id="mobile_btn">
        <i className="fa fa-bars"></i>
      </a>

      <ul className="nav user-menu">
        <li className="nav-item dropdown noti-dropdown">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <i className="fe fe-bell"></i>{" "}
            <span className="badge badge-pill">3</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <a href="javascript:void(0)" className="clear-noti">
                {" "}
                Clear All{" "}
              </a>
            </div>
            <div className="noti-content">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="#">
                    <div className="media">
                      <span className="avatar avatar-sm">
                        <Avatar
                          classList="avatar-img rounded-circle"
                          alt="User Image"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Dr. Ruby Perrin</span>{" "}
                          Schedule{" "}
                          <span className="noti-title">her appointment</span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="#">View all Notifications</a>
            </div>
          </div>
        </li>

        <li className="nav-item dropdown has-arrow">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <span className="user-img">
              <Avatar classList="rounded-circle" alt="Ryan Taylor" width="31" />
            </span>
          </a>
          <div className="dropdown-menu">
            <div className="user-header">
              <div className="avatar avatar-sm">
                <Avatar
                  src={user?.profile_photo}
                  classList="avatar-img rounded-circle"
                  alt="User Image"
                />
              </div>
              <div className="user-text">
                <h6>{user?.name}</h6>
                <p className="text-muted mb-0">{user?.role?.name}</p>
              </div>
            </div>
            <Link className="dropdown-item" to="/profile">
              My Profile
            </Link>
            <a className="dropdown-item" href="settings.html">
              Settings
            </a>
            <a className="dropdown-item" href="/login" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </li>
      </ul>

      {/* <ul className="nav user-menu">
        <li className="nav-item dropdown noti-dropdown" ref={dropDownRef}>
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
            onClick={toggleMenu}
          >
            <i className="fe fe-bell"></i>{" "}
            <span className="badge badge-pill">3</span>
          </a>
          {open && (
            <div
              className="dropdown-menu notifications"
              style={{ transform: "translateX(-305px)", display: "block" }}
            >
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <a href="javascript:void(0)" className="clear-noti">
                  Clear All
                </a>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  <li className="notification-message">
                    <a href="#">
                      <div className="media">
                        <span className="avatar avatar-sm">
                          <Avatar
                            alt="User Image"
                            classList="avatar-img rounded-circle"
                          />
                        </span>
                        <div className="media-body">
                          <p className="noti-details">
                            <span className="noti-title">Carl Kelly</span> send
                            a message{" "}
                            <span className="noti-title"> to his doctor</span>
                          </p>
                          <p className="noti-time">
                            <span className="notification-time">
                              12 mins ago
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="#">View all Notifications</a>
              </div>
            </div>
          )}
        </li>

        <li
          className={`nav-item dropdown has-arrow ${profileOpen ? "show" : ""}`}
          ref={profileDropRef}
        >
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
            aria-expanded={profileOpen}
            onClick={profileToggleMenu}
          >
            <span className="user-img">
              <Avatar alt="Ryan Taylor" classList="rounded-circle" width="31" />
            </span>
          </a>
          {profileOpen && (
            <div
              className={`dropdown-menu ${profileOpen ? "show" : ""}`}
              style={{ transform: "translate(-123px, 0)", display: "block" }}
            >
              <div className="user-header">
                <div className="avatar avatar-sm">
                  <Avatar
                    alt="User Image"
                    classList="avatar-img rounded-circle"
                  />
                </div>
                <div className="user-text">
                  <h6>Ryan Taylor</h6>
                  <p className="text-muted mb-0">Administrator</p>
                </div>
              </div>
              <a className="dropdown-item" href="profile.html">
                My Profile
              </a>
              <a className="dropdown-item" href="settings.html">
                Settings
              </a>
              <a className="dropdown-item" href="login.html">
                Logout
              </a>
            </div>
          )}
        </li>
      </ul> */}
    </div>
  );
};

export default Header;
