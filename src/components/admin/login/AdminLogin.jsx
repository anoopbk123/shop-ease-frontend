import React, { useState } from "react";
import "../../styles/form.css";
import formValidator from "../../../data/formValidator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../Services/adminApi";
import { useDispatch } from "react-redux";
import { updateAdminAuth } from "../../../Redux/slices/adminAuth";

export default function AdminLogin() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [passwordView, setPasswordView] = useState({
    view: "password",
    icon: "bi bi-eye",
  });
  //form errors
  const [userNameError, setUserNameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  //form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  //toggle password
  const togglePassword = () => {
    if (passwordView.view === "password") {
      setPasswordView({
        view: "text",
        icon: "bi bi-eye-slash",
      });
    } else {
      setPasswordView({
        view: "password",
        icon: "bi bi-eye",
      });
    }
  };
  //userName validation
  const handleUserNameInput = (event) => {
    const userNameInput = event.target.value;
    setUserName(userNameInput);
    setUserNameError(userNameInput.length ? true : false);
  };
  //password validation
  const handlePasswordInput = (event) => {
    const passwordInput = event.target.value;
    setPassword(passwordInput);
    setPasswordError(formValidator.password(passwordInput));
  };
  //form submit
  const submitForm = async (formData) => {
    // console.log(formData);
    // toast.success("login success");
    // navigator("/admin/manageproducts");
    try {
      const res = await adminLogin(formData);
      const data = res.data;
      if (data.status) {
        // console.log(data.token)
        localStorage.setItem("adminToken", data.token);
        dispatch(updateAdminAuth())
        toast.success(data.message);
        navigator("/admin/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("please try again latter");
      console.log(err);
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      [userName, password, userNameError, passwordError].some(
        (value) => value === "" || value === false
      )
    ) {
      toast.error("please fill all fields without errors");
    } else {
      submitForm({
        userName: userName,
        password: password,
      });
    }
  };
  return (
    <>
      <div className="container p-3">
        <h2 className="mt-5 text-center">Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="container mt-5 form-container justify-content-center">
            <div className="m-3 row justify-content-center">
              <label htmlFor="inputuserName" className="form-label col-12 col-sm-4">
                User name
              </label>
              <div className="col-12 col-sm-8">
                <input
                  type="userName"
                  className={`form-control ${
                    userNameError ? "" : "is-invalid"
                  }`}
                  id="inputuserName"
                  aria-describedby="userNameHelp"
                  onChange={handleUserNameInput}
                  value={userName}
                />
                {!userNameError && (
                  <div className="invalid-feedback">invalid userName</div>
                )}
              </div>
            </div>

            <div className="m-3 row justify-content-center">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label col-12 col-sm-4"
              >
                Password
              </label>
              <div className="col-12 col-sm-8 position-relative">
                <input
                  type={passwordView.view}
                  className={`form-control ${
                    passwordError ? "" : "is-invalid"
                  }`}
                  id="exampleInputPassword1"
                  onChange={handlePasswordInput}
                  value={password}
                />
                <span
                  className={`position-absolute translate-middle-y eye-icon fs-5 ${
                    passwordError ? "top-50" : "right"
                  }`}
                  onClick={togglePassword}
                >
                  <i className={passwordView.icon}></i>
                </span>
                {!passwordError && (
                  <div className="invalid-feedback">invalid password</div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
