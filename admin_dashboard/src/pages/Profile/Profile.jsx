import Avatar from "../../components/Avatar/Avatar";
import GetUserData from "../../hooks/getUserData";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authApiSlice";
import { useEffect, useState } from "react";
import { toastAlert } from "../../utils/toast";
import { setMessageEmpty } from "../../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error, message } = GetUserData();

  const [input, setInput] = useState({
    firstName: user?.name.split(" ")[0],
    lastName: user?.name.split(/\s+/).slice(1).join(" "),
    dateOfBirth: user?.dateOfBirth,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    city: user?.city,
    state: user?.state,
    zip: user?.zip,
    country: user?.country,
  });

  const handleChangeValue = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: user?._id,
        data: {
          ...input,
          name: input.firstName + " " + input.lastName,
        },
      })
    );
  };

  useEffect(() => {
    if (error) {
      toastAlert(error);
    }
    if (message) {
      toastAlert(message, "success");
      dispatch(setMessageEmpty());
    }
    if (user) {
      setInput({
        firstName: user?.name.split(" ")[0],
        lastName: user?.name.split(/\s+/).slice(1).join(" "),
        dateOfBirth: user?.dateOfBirth,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        zip: user?.zip,
        country: user?.country,
      });
    }
  }, [dispatch, error, message, user]);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="profile-header">
          <div className="row align-items-center">
            <div className="col-auto profile-image">
              <a href="#">
                <Avatar
                  classList="rounded-circle"
                  alt={user?.name}
                  src={user?.profile_photo}
                />
              </a>
            </div>
            <div className="col ml-md-n2 profile-user-info">
              <h4 className="user-name mb-0">{user?.name}</h4>
              <h6 className="text-muted">{user?.email}</h6>
              <div className="user-Location">
                <i className="fa fa-map-marker"></i> {user?.address}
              </div>
              <div className="about-text">{user?.bio}</div>
            </div>
            <div className="col-auto profile-btn">
              <a href="#" className="btn btn-primary">
                Edit
              </a>
            </div>
          </div>
        </div>
        <div className="profile-menu">
          <ul className="nav nav-tabs nav-tabs-solid">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#per_details_tab"
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#password_tab">
                Password
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content profile-tab-cont">
          {/* Personal Details Tab */}
          <div className="tab-pane fade show active" id="per_details_tab">
            {/* Personal Details */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between">
                      <span>Personal Details</span>
                      <a
                        className="edit-link"
                        data-toggle="modal"
                        href="#edit_personal_details"
                      >
                        <i className="fa fa-edit mr-1"></i>Edit
                      </a>
                    </h5>
                    <div className="row">
                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                        Name
                      </p>
                      <p className="col-sm-10">{user?.name}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                        Date of Birth
                      </p>
                      <p className="col-sm-10">{user?.dateOfBirth}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                        Email ID
                      </p>
                      <p className="col-sm-10">{user?.email}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                        Mobile
                      </p>
                      <p className="col-sm-10">{user?.phone}</p>
                    </div>
                    <div className="row">
                      <p className="col-sm-2 text-muted text-sm-right mb-0">
                        Address
                      </p>
                      <p className="col-sm-10 mb-0">
                        {user?.address}
                        {user?.address && <br />}
                        {user?.city}
                        <br />
                        {user?.state} - {user?.zip}
                        <br />
                        {user?.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Edit Details Modal */}
                <div
                  className="modal fade"
                  id="edit_personal_details"
                  aria-hidden="true"
                  role="dialog"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Personal Details</h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleEditSubmit}>
                          <div className="row form-row">
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="firstName"
                                  value={input.firstName}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="lastName"
                                  value={input.lastName}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label>Date of Birth</label>
                                <div className="cal-icon">
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="dateOfBirth"
                                    value={input.dateOfBirth}
                                    onChange={handleChangeValue}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Email ID</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  value={input.email}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Mobile</label>
                                <input
                                  type="text"
                                  name="phone"
                                  value={input.phone}
                                  onChange={handleChangeValue}
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <h5 className="form-title">
                                <span>Address</span>
                              </h5>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label>Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="address"
                                  value={input.address}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="city"
                                  value={input.city}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>State</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="state"
                                  value={input.state}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="zip"
                                  value={input.zip}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-sm-6">
                              <div className="form-group">
                                <label>Country</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="country"
                                  value={input.country}
                                  onChange={handleChangeValue}
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Save Changes
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Edit Details Modal */}
              </div>
            </div>
            {/* Personal Details */}
          </div>
          {/* Personal Deatails Tab */}

          {/* Change Password */}
          <div id="password_tab" className="tab-pane fade">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Change Password</h5>
                <div className="row">
                  <div className="col-md-10 col-lg-6">
                    <form>
                      <div className="form-group">
                        <label>Old Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" />
                      </div>
                      <button className="btn btn-primary" type="submit">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
