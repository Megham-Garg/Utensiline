import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birth_date: "",
    error: "",
    success: false,
  });

  const { first_name, last_name, email, password, birth_date, error, success } = values;

  const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ first_name, last_name, email, password, birth_date})
      .then((data) => {
        if (data.email === email) {
          setValues({
            ...values,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birth_date: "",
            error: "",
            success: true,
          });
        } else {
          setValues({
            ...values,
            error: true,
            success: false,
          });
        }
      })
      .catch((e) => console.error(e));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
            New account created successfully. Please <Link to="/signin">login now.</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            Check all fields again
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">First Name</label>
              <input
                className="form-control"
                value={first_name}
                onChange={handleChange("first_name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                value={last_name}
                onChange={handleChange("last_name")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label className="text-light">password</label>
              <input
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <div className="form-group">
              <label className="text-light">birth date</label>
              <input
                className="form-control"
                placeholder="YYYY-MM-DD"
                type="text"
                // name="begin"
                // min="1930-01-01"
                // max="2019-12-31"
                value={birth_date}
                onChange={handleChange("birth_date")}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-success btn-block"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A signup for Utensiline user">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">
        // {JSON.stringify(values)}
      </p> */}
    </Base>
  );
};

export default Signup;
