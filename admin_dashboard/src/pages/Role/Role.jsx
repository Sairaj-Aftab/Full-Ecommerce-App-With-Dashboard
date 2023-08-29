import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import FormInputValue from "../../hooks/formInputValue";
import {
  getAllDataOfUser,
  setMessageEmpty,
} from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import {
  createRule,
  deleteRule,
  editRule,
  updateRuleStatus,
} from "../../features/user/userApiSllice";
import { toastAlert } from "../../utils/toast";
import swal from "sweetalert";
import DataTables from "datatables.net-dt";

const Role = () => {
  const dispatch = useDispatch();
  const { permissions, rules, error } = useSelector(getAllDataOfUser);
  const { input, handleChangeValue, formReset } = FormInputValue({
    name: "",
  });

  const [selected, setSelected] = useState([]);

  const handleChangeCheckbox = (e) => {
    const select = e.target.value;

    const selectedItem = [...selected];

    if (selected.includes(select)) {
      selectedItem.splice(selected.indexOf(select), 1);
    } else {
      selectedItem.push(select);
    }

    setSelected(selectedItem);
  };

  const handleSubmitNewRule = (e) => {
    e.preventDefault();
    if (!input.name || selected.length < 1) {
      toastAlert("All fields are required");
    } else {
      dispatch(createRule({ name: input.name, permissions: selected }));
      dispatch(setMessageEmpty());
      formReset();
      setSelected([]);
    }
  };

  const handleDeleteRule = (id) => {
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
        dispatch(deleteRule(id));
        dispatch(setMessageEmpty());
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleUpdateStatus = (id, status) => {
    dispatch(updateRuleStatus({ id, status }));
    dispatch(setMessageEmpty());
  };

  const [findRule, setFindRule] = useState({});

  const handleChangeEditValue = (e) => {
    setFindRule((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditRule = (id) => {
    const rule = rules.find((data) => data._id == id);
    setFindRule(rule);
    setSelected(rule.permissions);
  };

  const handleEditRuleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editRule({ id: findRule._id, name: findRule.name, permissions: selected })
    );
    dispatch(setMessageEmpty());
  };
  useEffect(() => {
    new DataTables(".dataTable");
    if (error) {
      toastAlert(error);
    }
  }, [error]);
  return (
    <>
      {/* Rule Adding Form inside Modal Popup */}
      <ModalPopup target="modalPopup">
        <form onSubmit={handleSubmitNewRule} className="d-flex flex-column">
          <label htmlFor="name">*Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={input.name}
            onChange={handleChangeValue}
            className="form-control"
          />
          {permissions && (
            <div>
              <p className="my-2">*Permission</p>
              {permissions.map((data, index) => {
                return (
                  <>
                    <label key={index} className="d-block">
                      <input
                        type="checkbox"
                        name="permissions"
                        value={data.name}
                        onChange={handleChangeCheckbox}
                        checked={selected.includes(data.name)}
                      />{" "}
                      {data.name}
                    </label>
                  </>
                );
              })}
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-2">
            Add
          </button>
        </form>
      </ModalPopup>
      {/* Rule Adding Form inside Modal Popup */}
      {/* Rule Edit Form inside Modal Popup */}
      <ModalPopup target="ruleEditPopup">
        <form onSubmit={handleEditRuleSubmit} className="d-flex flex-column">
          <label htmlFor="name">*Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={findRule.name}
            onChange={handleChangeEditValue}
            className="form-control"
          />
          {permissions && (
            <div>
              <p className="my-2">*Permission</p>
              {permissions.map((data, index) => {
                return (
                  <>
                    <label key={index} className="d-block">
                      <input
                        type="checkbox"
                        name="permissions"
                        value={data.name}
                        onChange={handleChangeCheckbox}
                        checked={selected.includes(data.name)}
                      />{" "}
                      {data.name}
                    </label>
                  </>
                );
              })}
            </div>
          )}
          <button type="submit" className="btn btn-primary mt-2">
            Add
          </button>
        </form>
      </ModalPopup>
      {/* Rule Edit Form inside Modal Popup */}

      <PageHeader title="User Rules" />
      <button
        data-target="#modalPopup"
        data-toggle="modal"
        className="btn btn-primary mb-3"
      >
        Add new rule
      </button>
      <div className="row">
        <div className="col-md-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <table className="dataTable table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Permissions</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  {rules && (
                    <tbody>
                      {[...rules].reverse().map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>1</td>
                            <td>{data.name}</td>
                            <td>{data.slug}</td>
                            <td>
                              <ul>
                                {data.permissions.map((per, index) => {
                                  return <li key={index}>{per}</li>;
                                })}
                              </ul>
                            </td>
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
                                data-target="#ruleEditPopup"
                                data-toggle="modal"
                                onClick={() => handleEditRule(data._id)}
                                className="border-0 bg-success text-light mr-2"
                              >
                                <i className="fa fa-pencil-square-o" />
                              </button>
                              <button
                                onClick={() => handleDeleteRule(data._id)}
                                className="border-0 bg-danger text-light"
                              >
                                <i className="fa fa-trash" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Role;
