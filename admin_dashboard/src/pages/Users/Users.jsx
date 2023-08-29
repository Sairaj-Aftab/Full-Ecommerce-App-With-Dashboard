import { useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import DataTables from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import { generateRandomPassword } from "../../utils/GenerateRandomPassword";
import FormInputValue from "../../hooks/formInputValue";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  deleteUser,
  updateUserStatus,
} from "../../features/user/userApiSllice";
import {
  getAllDataOfUser,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { toastAlert } from "../../utils/toast";
import { timeAgo } from "../../utils/timeAgo";
import swal from "sweetalert";

const Users = () => {
  const dispatch = useDispatch();
  const { users, rules, message, error, success } =
    useSelector(getAllDataOfUser);
  const { input, handleChangeValue, formReset, setInput } = FormInputValue({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleGenRanPassword = () => {
    const ranPass = generateRandomPassword();
    setInput((prev) => ({ ...prev, password: ranPass }));
  };

  const handleCreateUserSubmit = (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password || !input.role) {
      toastAlert("All fields are required");
    } else {
      dispatch(createUser(input));
      dispatch(setMessageEmpty());
    }
  };

  const handleUpdateStatus = (id, status) => {
    if (id) {
      dispatch(updateUserStatus({ id, status }));
      dispatch(setMessageEmpty());
    }
  };

  const handleDeleteUser = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`Poof! Successfully deleted`, {
          icon: "success",
        });
        dispatch(deleteUser(id));
        dispatch(setMessageEmpty());
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  useEffect(() => {
    new DataTables(".dataTable");
    if (error) {
      toastAlert(error);
    }
    if (message) {
      toastAlert(message, "success");
    }
    if (success) {
      formReset();
      dispatch(setMessageEmpty());
    }
  }, [error, message, success, dispatch]);
  return (
    <>
      <ModalPopup target="userModalPopup">
        <form onSubmit={handleCreateUserSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChangeValue}
              className="form-control"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="name">Email</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={handleChangeValue}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              name="password"
              value={input.password}
              onChange={handleChangeValue}
              className="form-control"
            />
            <a
              onClick={handleGenRanPassword}
              className="badge badge-info text-light"
            >
              Generate random password
            </a>
          </div>
          <div className="form-group">
            <select
              name="role"
              onChange={handleChangeValue}
              className="form-control inputstl"
            >
              <option value="">--Select--</option>
              {rules?.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </ModalPopup>
      <PageHeader title="Users" />
      <button
        data-target="#userModalPopup"
        data-toggle="modal"
        className="btn btn-primary mb-3"
      >
        Add new user
      </button>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {users && (
                  <table className="dataTable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Rule</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[...users].reverse().map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <h2 className="table-avatar">
                                <a
                                  href="profile.html"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <Avatar
                                    classList="avatar-img rounded-circle"
                                    alt="User Image"
                                  />
                                </a>
                                <a href="profile.html">{data.name}</a>
                              </h2>
                            </td>
                            <td>{data.email}</td>
                            <td>{data.role?.name}</td>
                            <td>{timeAgo(data.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={data.status ? true : false}
                                />
                                <label
                                  htmlFor="status_1"
                                  onClick={() =>
                                    handleUpdateStatus(data._id, data.status)
                                  }
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button
                                data-target="#userEditPopup"
                                data-toggle="modal"
                                className="border-0 bg-success text-light mr-2"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(data._id)}
                                className="border-0 bg-danger text-light"
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
