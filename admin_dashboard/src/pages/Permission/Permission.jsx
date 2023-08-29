import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import DataTables from "datatables.net-dt";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDataOfUser,
  setMessageEmpty,
} from "../../features/user/userSlice";
import {
  createPermission,
  deletePermission,
  updatePermissionStatus,
} from "../../features/user/userApiSllice";
import { toastAlert } from "../../utils/toast";
import swal from "sweetalert";
import { timeAgo } from "../../utils/timeAgo";

const Permission = () => {
  const dispatch = useDispatch();
  const { permissions, error, message } = useSelector(getAllDataOfUser);
  const [name, setName] = useState("");
  useEffect(() => {
    new DataTables(".dataTable");
    if (error) {
      toastAlert(error);
    }
    if (message) {
      toastAlert(message, "success");
    }
  }, [dispatch, error, message]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name) {
      toastAlert("Name is required!");
    } else {
      dispatch(createPermission(name));
      setName("");

      dispatch(setMessageEmpty());
    }
  };

  const handleDelete = (id) => {
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
        dispatch(deletePermission(id));
        dispatch(setMessageEmpty());
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleChangeStatus = (id, status) => {
    dispatch(updatePermissionStatus({ id, status }));
    dispatch(setMessageEmpty());
  };

  return (
    <>
      {/* Permission Adding Form inside Modal Popup */}
      <ModalPopup target="permissionModalPopup">
        <form onSubmit={handleCreate} className="d-flex flex-column">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-2">
            Add
          </button>
        </form>
      </ModalPopup>
      {/* Permission Adding Form inside Modal Popup */}

      <PageHeader title="User Permission" />
      <button
        data-target="#permissionModalPopup"
        data-toggle="modal"
        className="btn btn-primary mb-3"
      >
        Add new permission
      </button>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                {permissions && (
                  <table className="dataTable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissions.length > 0 &&
                        [...permissions].reverse().map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data.name}</td>
                              <td>{data.slug}</td>
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
                                      handleChangeStatus(data._id, data.status)
                                    }
                                    className="checktoggle"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </td>
                              <td className="text-right">
                                <button
                                  onClick={() => handleDelete(data._id)}
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

export default Permission;
